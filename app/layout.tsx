import React from "react";
import { SessionProvider} from "next-auth/react";
import { auth } from "@/auth";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Modals } from "@/components/providers/modal-provider";
import { Toaster } from "@/components/ui/sonner";

const ibm = Poppins({ subsets: ["latin"], weight: "500"});

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
          <body className={ibm.className}>
            <Toaster />
            <Modals />
            {children}
            </body>
        </html>
      </SessionProvider>
  );
}
