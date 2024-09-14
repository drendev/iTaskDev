"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

export const NavLinks = ({ children, active, path}: any) => {
    return (
        <Link className={cn(
        "flex px-7 cursor-pointer h-10 text-slate-500 items-center text-sm hover:bg-gray-50 hover:rounded-r-full",
        active && 
        "flex rounded-r-full bg-slate-300 text-slate-800 cursor-pointer hover:bg-slate-300"
        )}
        href={path}
        >
            {children}
        </Link>
    )
}
