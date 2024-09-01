"use client";

import Image from "next/image";
import { useCurrentUser } from "@/hooks/use-current-user";
import { GoBell } from "react-icons/go";
import { GoInbox } from "react-icons/go";
import { GoVersions } from "react-icons/go";
import { GoGoal } from "react-icons/go";
import {Button} from "@/components/ui/button";

export const NavUtils = () => {
    const session = useCurrentUser();

    return (
        <div className="flex justify-end items-center">
            <Button variant="ghost" className="rounded-full">
                <GoBell className="w-5 h-5" color="#475569"/>
            </Button>
            <Button variant="ghost" className="rounded-full">
                <GoInbox className="w-5 h-5" color="#475569"/>
            </Button>
            <Button variant="ghost" className="rounded-full">
                <GoGoal className="w-5 h-5" color="#475569"/>
            </Button>
            <Button variant="ghost" className="rounded-full">
            <GoVersions className="w-5 h-5" color="#475569"/>
            </Button>

            <div className="rounded-full hover:bg-slate-100 p-1 cursor-pointer">

            </div>
        </div>
    )
}