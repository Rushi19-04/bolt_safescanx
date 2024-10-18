import axios from 'axios';

// Mock data for testing
const mockScanResult = {
  clean: 8,
  flagged: 2
};

export const scanFile = async (file: File) => {
  // Simulating an API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockScanResult;
};

export const scanUrl = async (url: string) => {
  // Simulating an API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockScanResult;
};

// Keep these commented out for now, to be used when the real API is set up
/*
export const scanFile = async (file: File) => {
  try {
    const response = await axios.post('/api/scan', { type: 'file', data: file.name });
    return response.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'An error occurred while scanning the file');
  }
};

export const scanUrl = async (url: string) => {
  try {
    const response = await axios.post('/api/scan', { type: 'url', data: url });
    return response.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'An error occurred while scanning the URL');
  }
};
*/