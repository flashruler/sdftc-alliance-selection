// components/CSVUploader.tsx
"use client"
import React from 'react';
import { FileUploader } from 'react-drag-drop-files';
import Papa from 'papaparse';
import { useCSV } from './CSVContext';

const fileTypes = ["CSV"];

function CSVUploader() {
  const { setData } = useCSV();

  const handleFileChange = (file: File) => {
    Papa.parse(file, {
      complete: (results) => {
        setData(results.data); // Update context with parsed data
        console.log(results.data); // Log or process the CSV data as needed
      },
      header: true,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <FileUploader handleChange={handleFileChange} name="file" types={fileTypes} />
    </div>
  );
}

export default CSVUploader;