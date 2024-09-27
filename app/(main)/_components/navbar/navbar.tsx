"use client";

import NavLogo from "./nav-logo";
import { NavUtils } from "@/app/(main)/_components/navbar/nav-utils";
import { SearchBar } from "../../../../components/admin-panel/search-bar";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import DropDownHome from "./drop-down-home";

import { X, AlignJustify } from "lucide-react";

import Link from "next/link";

export const Navbar = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };
  return (
    <nav className="flex flex-row px-6 py-4 w-full">
      <div className="basis-1/5">
        <NavLogo />
      </div>
      <div className="basis-1/2">
        <SearchBar />
      </div>
      <div className="basis-1/2">
        <NavUtils />
      </div>
      {isDropdownVisible && (
        <div onClick={toggleDropdown} className="rounded-full xl:hidden flex items-center pb-2">
          <X className="h-5 w-5 items-center justify-center" />
        </div>
      )}

      {!isDropdownVisible && (
        <div onClick={toggleDropdown} className="flex lg:hidden items-center pb-2">
          <AlignJustify className="h-5 w-5 items-center justify-center mr-2" />
        </div>
      )}

      {isDropdownVisible && <DropDownHome onClose={closeDropdown} />}
    </nav>
  );
};
