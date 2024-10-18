import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ScanResults = ({ result }) => {
  const data = {
    labels: ['Clean', 'Flagged'],
    datasets: [
      {
        data: [result.clean, result.flagged],
        backgroundColor: ['#4CAF50', '#F44336'],
        hoverBackgroundColor: ['#45a049', '#da190b'],
      },
    ],
  };

  return (
    <div className="scan-results">
      <h2>Scan Results</h2>
      <div className="chart-container">
        <Pie data={data} />
      </div>
      <div className="result-summary">
        <p>Clean: {result.clean}</p>
        <p>Flagged: {result.flagged}</p>
      </div>
    </div>
  );
};

export default ScanResults;