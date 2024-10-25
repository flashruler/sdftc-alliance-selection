// components/CSVContext.tsx
"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CSVContextType {
  data: any[];
  setData: (data: any[]) => void;
}

const CSVContext = createContext<CSVContextType | undefined>(undefined);

export const CSVProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<any[]>([]);

  // Ensure state is consistent between server and client
  useEffect(() => {
    // Any client-specific initialization can go here
  }, []);

  return (
    <CSVContext.Provider value={{ data, setData }}>
      {children}
    </CSVContext.Provider>
  );
};

export const useCSV = () => {
  const context = useContext(CSVContext);
  if (!context) {
    throw new Error('useCSV must be used within a CSVProvider');
  }
  return context;
};