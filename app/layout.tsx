import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";


const ibm = IBM_Plex_Sans({ subsets: ["latin"], weight: "300" });

export const metadata: Metadata ={
  title: "iTaskDev",
  description: "Optimize Task Assignment in Software Development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ibm.className}>{children}</body>
    </html>
  );
}
