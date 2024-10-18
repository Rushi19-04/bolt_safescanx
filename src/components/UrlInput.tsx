import React, { useState } from 'react';

const UrlInput = ({ onUrlScan }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) {
      onUrlScan(url);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="url-form">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL to scan"
        required
      />
      <button type="submit">Scan URL</button>
    </form>
  );
};

export default UrlInput;