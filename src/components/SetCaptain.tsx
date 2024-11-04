/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useState } from 'react';
import { useCaptain } from './CaptainContext';
import { useCSV } from './CSVContext';
import { sampleSize } from 'lodash';

export default function SetCaptain() {
    const {setCaptainData } = useCaptain();
    const { data, setData } = useCSV(); // Assuming useCSV provides setData to update the data state
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        if (data && data.length > 0 && trigger) {
            const selectedEntries = sampleSize(data, 8).map(entry => {
                const captainNumber = Object.values(entry)[0]; // Get the first value in the object
                return {
                    captain: captainNumber
                };
            });

            // Filter out the selected entries from the data
            const remainingData = data.filter(entry => {
                const captainNumber = Object.values(entry)[0];
                return !selectedEntries.some(selected => selected.captain === captainNumber);
            });

            setCaptainData(selectedEntries);
            setData(remainingData); // Update the data state with the remaining entries
            setTrigger(false); // Reset trigger
        }
    }, [data, setCaptainData, setData, trigger]);

    const handleClick = () => {
        setTrigger(true);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <button className="bg-orange-400 p-5 rounded-lg font-medium" onClick={handleClick}>Set Captains</button>
        </div>
    );
}