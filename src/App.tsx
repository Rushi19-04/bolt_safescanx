import React, { useState, useEffect } from 'react';
import { Shield, Upload, Link } from 'lucide-react';
import FileUpload from './components/FileUpload';
import UrlInput from './components/UrlInput';
import ScanResults from './components/ScanResults';
import { scanFile, scanUrl } from './services/virusTotalService';
import GoogleSignIn from './components/GoogleSignIn';
import './styles/App.scss';

function App() {
  const [scanResult, setScanResult] = useState<{ clean: number; flagged: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('App component mounted');
  }, []);

  const handleFileScan = async (file: File) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await scanFile(file);
      setScanResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during file scan');
    }
    setIsLoading(false);
  };

  const handleUrlScan = async (url: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await scanUrl(url);
      setScanResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during URL scan');
    }
    setIsLoading(false);
  };

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <Shield size={48} />
        <h1>SafeScanX</h1>
        <GoogleSignIn />
      </header>
      <main className="app-main">
        <section className="scan-section">
          <div className="scan-option">
            <h2><Upload size={24} /> File Scan</h2>
            <FileUpload onFileScan={handleFileScan} />
          </div>
          <div className="scan-option">
            <h2><Link size={24} /> URL Scan</h2>
            <UrlInput onUrlScan={handleUrlScan} />
          </div>
        </section>
        {isLoading && <div className="loading">Scanning...</div>}
        {scanResult && <ScanResults result={scanResult} />}
      </main>
    </div>
  );
}

export default App;