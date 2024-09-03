"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { GoBell } from "react-icons/go";
import { GoInbox } from "react-icons/go";
import { GoVersions } from "react-icons/go";
import { GoGoal } from "react-icons/go";
import { Button } from "@/components/ui/button";
import { FaUser } from "react-icons/fa";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from "@/components/ui/avatar";
import { LogoutButton } from "@/components/auth/logout-button";

export const NavUtils = () => {
    const user = useCurrentUser();

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
            <Button variant="ghost" className="rounded-full mr-3.5">
            <GoVersions className="w-5 h-5" color="#475569"/>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage height={28} width={28} src={user?.image || ""} />
                            <AvatarFallback>
                                <FaUser />
                            </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="end">
                    <LogoutButton>
                        <DropdownMenuItem>
                            Logout
                        </DropdownMenuItem>
                    </LogoutButton>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}