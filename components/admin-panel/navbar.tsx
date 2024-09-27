"use client"

import { ModeToggle } from "../mode-toggle";
import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { Bell } from "lucide-react";
import { Button } from "../ui/button";
import { SearchBar } from "./search-bar";

interface NavbarProps {
  title: string;
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold"></h1>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <SearchBar/>
          <Button variant="ghost" className="rounded-xl mx-5">
            <Bell className="w-5 h-5" />
          </Button>
          <UserNav />
        </div>
      </div>
    </header>
  );
}
