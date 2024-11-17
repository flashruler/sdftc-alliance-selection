/* eslint-disable */
"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
const CSVUploader = dynamic(() => import("@/components/CSVUploader"), {
  ssr: false,
});
import { useCSV } from "@/components/CSVContext";
import { useCaptain } from "@/components/CaptainContext";
import SetCaptain from "@/components/SetCaptain";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  const { data, setData } = useCSV();
  const { CaptainData,setCaptainData } = useCaptain();
  const [open, setOpen] = useState(!data);

  // console.log(CaptainData);
  if(data.length === 0 && CaptainData.length === 0) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <h1 className="text-3xl font-thin py-5">San Diego FIRST Tech Challenge League Meet Alliance Selection</h1>
        <Dialog open={open} onOpenChange={setOpen} defaultOpen={!data}>
          <DialogTrigger className="text-xl bg-orange-400 p-10 rounded-lg">Open</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload a Team List CSV</DialogTitle>
              <DialogDescription>
                In the future, this will ask for a server IP from the scoring system.
              </DialogDescription>
              <CSVUploader />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  const handleAddCompetingTeam = (teamId:any) => {
    const nextEmptyIndex = CaptainData.findIndex(entry => !entry.partner);
    console.log(nextEmptyIndex);
    if (nextEmptyIndex !== -1) {
      const newCaptainData = [...CaptainData];
      newCaptainData[nextEmptyIndex] = { captain:CaptainData[nextEmptyIndex].captain, partner: teamId };
      console.log(newCaptainData[nextEmptyIndex]) // Populate the next empty alliance with the selected team
      setCaptainData(newCaptainData);

      const remainingData = data.filter(entry => Object.values(entry)[0] !== teamId);
      setData(remainingData);
    }
  };
  return (
    <div className="grid grid-cols-2 w-screen p-10">
        {data && data.length > 0 ? (
          <div className="overflow-auto w-full p-5">
            <ul className="list-disc list-inside">
              {data.map((row, index) => (
                <li key={index} className="mb-2 flex justify-between items-center">
                  <div>
                    {Object.entries(row).map(([key, value], idx) => (
                      <div key={idx} className="flex">
                        <span>{value as string}</span>
                      </div>
                    ))}
                  </div>
                    {CaptainData.length > 0 && (
                    <button
                      className="bg-blue-500 text-white p-2 rounded ml-4"
                      onClick={() => handleAddCompetingTeam(Object.values(row)[0])} // Assuming the first value is the team ID
                    >
                      Add to Alliance
                    </button>
                    )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No data available</p>
        )}
        <div>
          <h2 className=" text-2xl">Dashboard</h2>
          {!CaptainData || CaptainData.length === 0 ? <SetCaptain /> : null}
          {CaptainData && CaptainData.length > 0 && (
            <div className="mt-5">
              <SetCaptain />
              <h2 className="text-2xl font-medium">Selected Captains</h2>
              <ul className="list-disc list-inside">
                {CaptainData.map((entry, index) => (
                  <li key={index}>
                    Captain: {entry.captain}, Partner: {entry.partner}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
  );
}
