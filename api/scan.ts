import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const API_KEY = process.env.VIRUSTOTAL_API_KEY;
const API_URL = 'https://www.virustotal.com/api/v3';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const { type, data } = req.body;

    try {
      let response;
      if (type === 'url') {
        response = await axios.post(`${API_URL}/urls`, new URLSearchParams({ url: data }), {
          headers: {
            'x-apikey': API_KEY,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
      } else if (type === 'file') {
        // For file scanning, we'd need to implement file upload handling
        // This is a simplified version that doesn't actually scan files
        response = { data: { data: { attributes: { total: 10, malicious: 2 } } } };
      } else {
        return res.status(400).json({ error: 'Invalid scan type' });
      }

      const result = processScanResults(response.data);
      return res.status(200).json(result);
    } catch (error) {
      console.error('Error scanning:', error);
      return res.status(500).json({ error: 'An error occurred during the scan' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}

function processScanResults(data: any) {
  const totalScans = data.data.attributes.total || 0;
  const malicious = data.data.attributes.malicious || 0;

  return {
    clean: totalScans - malicious,
    flagged: malicious,
  };
}