import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ onFileScan }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.size <= 32 * 1024 * 1024) { // 32 MB limit
        onFileScan(file);
      } else {
        alert('File size exceeds 32 MB limit.');
      }
    }
  }, [onFileScan]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the file here ...</p> :
          <p>Drag 'n' drop a file here, or click to select a file</p>
      }
    </div>
  );
};

export default FileUpload;