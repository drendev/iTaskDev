"use client";

import {NavLogo} from "@/app/(main)/_components/navbar/nav-logo";
import {NavUtils} from "@/app/(main)/_components/navbar/nav-utils";
import { Search } from "@/components/ui/search";

export const Navbar = () => {
    return(
        <nav className="flex flex-row px-6 py-4 w-full">
            <div className="basis-1/4">
                <NavLogo />
            </div>
            <div className="basis-1/2">
                <Search className="w-[600px]"/>
            </div>
            <div className="basis-1/4">
                <NavUtils />
            </div>
        </nav>
    )
}
