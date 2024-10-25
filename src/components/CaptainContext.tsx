// components/CSVContext.tsx
"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CSVContextType {
  CaptainData: any[];
  setCaptainData: (data: any[]) => void;
}

const CaptainContext = createContext<CSVContextType | undefined>(undefined);

export const CaptainProvider = ({ children }: { children: ReactNode }) => {
  const [CaptainData, setCaptainData] = useState<any[]>([]);

  // Ensure state is consistent between server and client
  useEffect(() => {
    // Any client-specific initialization can go here
  }, []);

  return (
    <CaptainContext.Provider value={{CaptainData, setCaptainData }}>
      {children}
    </CaptainContext.Provider>
  );
};

export const useCaptain = () => {
  const context = useContext(CaptainContext);
  if (!context) {
    throw new Error('useCSV must be used within a CSVProvider');
  }
  return context;
};