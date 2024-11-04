/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CaptainDataType {
  captain: any;
  partner: any;
}

interface CSVContextType {
  CaptainData: any[];
  setCaptainData: (data: CaptainDataType[]) => void;
}

const CaptainContext = createContext<CSVContextType | undefined>(undefined);

export const CaptainProvider = ({ children }: { children: ReactNode }) => {
  const [CaptainData, setCaptainData] = useState<CaptainDataType[]>([]);

  // Ensure state is consistent between server and client
  useEffect(() => {
    // Any client-specific initialization can go here
  }, []);

  return (
    <CaptainContext.Provider value={{ CaptainData, setCaptainData }}>
      {children}
    </CaptainContext.Provider>
  );
};

export const useCaptain = () => {
  const context = useContext(CaptainContext);
  if (!context) {
    throw new Error('useCaptain must be used within a CaptainProvider');
  }
  return context;
};