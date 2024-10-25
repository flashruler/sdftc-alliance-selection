// app/layout.tsx
import "./globals.css";
import React from "react";
import { CSVProvider } from "../components/CSVContext";
import { CaptainProvider } from "../components/CaptainContext";
import { TeamProvider } from "@/components/AllianceContext";

import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <CSVProvider>
          <CaptainProvider>
            <TeamProvider>{children}</TeamProvider>
          </CaptainProvider>
        </CSVProvider>
      </body>
    </html>
  );
}
