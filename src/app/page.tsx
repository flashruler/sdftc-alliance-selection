"use client";
import { useState, useEffect } from "react";
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
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  const { data } = useCSV();
  const { CaptainData } = useCaptain();
  const [open, setOpen] = useState(!data);

  console.log(data);
  if(data.length === 0) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
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
  else return (
    <div className="grid grid-cols-2 w-screen p-10">
        {data && data.length > 0 ? (
          <div className="overflow-auto w-full p-5">
            <table className="table-auto border-collapse border border-gray-400 w-full">
              <thead>
                <tr>
                  {Object.keys(data[0]).map((key) => (
                    <th key={key} className="border border-gray-300 px-4 py-2">
                      Competing Teams
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, idx) => (
                      <td
                        key={idx}
                        className="border border-gray-300 px-4 py-2"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No data available</p>
        )}
        <div>
          <h2 className=" text-2xl">Dashboard</h2>
          <SetCaptain />
          {CaptainData && CaptainData.length > 0 ? (
            <div className="overflow-auto w-full p-5">
              <table className="table-auto border-collapse border border-gray-400 w-full">
                <thead>
                  <tr>
                    {Object.keys(data[0]).map((key) => (
                      <th
                        key={key}
                        className="border border-gray-300 px-4 py-2"
                      >
                        Captains
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CaptainData.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, idx) => (
                        <td
                          key={idx}
                          className="border border-gray-300 px-4 py-2"
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
  );
}
