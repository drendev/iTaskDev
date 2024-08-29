"use client";

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";
import {Navbar} from "@/app/(protected)/_components/navbar";
import { Hero } from "@/app/(protected)/_components/hero";

const SettingsPage = () => {
  const session = useCurrentUser();

  const onClick = () => {
    logout();
  };

  return (
    <>
      <Navbar />
      <Hero />
      <div>
        <button type="submit" onClick={onClick}>
          Sign Out
        </button>
      </div>
    </>
  );
};

export default SettingsPage;
