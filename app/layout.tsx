import React from "react";
import { SessionProvider} from "next-auth/react";
import { auth } from "@/auth";
import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";


const ibm = IBM_Plex_Sans({ subsets: ["latin"], weight: "300" });

export const metadata: Metadata ={
  title: "iTaskDev",
  description: "Optimize Task Assignment in Software Development",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
      <SessionProvider session={session}>
        <html lang="en">
          <body className={ibm.className}>{children}</body>
        </html>
      </SessionProvider>
  );
}
