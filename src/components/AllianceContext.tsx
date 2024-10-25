"use client"
import React, { createContext, useState, ReactNode } from 'react';

// Define the structure of your object
interface Alliance {
  captain: number;
  partner: number;
  key: number;
}

// Define the context type
interface TeamContextType {
  alliance: Alliance[];
  setAlliance: (alliance: Alliance[]) => void;
  updateTeamCaptain: (key: number, captain: number) => void;
  updateTeamPartner: (key: number, partner: number) => void;
}

// Create the context with an initial undefined value
const TeamContext = createContext<TeamContextType | undefined>(undefined);

const TeamProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state with an array of empty objects with keys from 0 to 7
  const [alliance, setAlliance] = useState<Alliance[]>(
    Array.from({ length: 8 }, (_, index) => ({ captain: 0, partner: 0, key: index }))
  );

  const updateTeamCaptain = (key: number, captain: number) => {
    setAlliance(prevMembers =>
      prevMembers.map(member =>
        member.key === key ? { ...member, captain } : member
      )
    );
  };

  const updateTeamPartner = (key: number, partner: number) => {
    setAlliance(prevMembers =>
      prevMembers.map(member =>
        member.key === key ? { ...member, partner } : member
      )
    );
  };

  return (
    <TeamContext.Provider value={{ alliance, setAlliance, updateTeamCaptain, updateTeamPartner }}>
      {children}
    </TeamContext.Provider>
  );
};

export { TeamProvider };
export default TeamContext;