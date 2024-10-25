import React, { useEffect, useState } from 'react';
import { useCaptain } from './CaptainContext';
import { useCSV } from './CSVContext';
import { sampleSize } from 'lodash';

export default function SetCaptain() {
    const { setCaptainData } = useCaptain();
    const { data } = useCSV();
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        if (data && data.length > 0 && trigger) {
            const selectedEntries = sampleSize(data, 8);
            setCaptainData(selectedEntries);
            setTrigger(false); // Reset trigger
        }
    }, [data, setCaptainData, trigger]);

    const handleClick = () => {
        setTrigger(true);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <button className="" onClick={handleClick}>Select Captains</button>
        </div>
    );
}