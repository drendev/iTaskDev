import { useCurrentUser } from "@/hooks/use-current-user";
import { GoBell } from "react-icons/go";
import { GoInbox } from "react-icons/go";
import { GoVersions } from "react-icons/go";
import { GoGoal } from "react-icons/go";
import { Button } from "@/components/ui/button";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogoutButton } from "@/components/auth/logout-button";

import { useRouter } from "next/navigation";

interface DropDownMenuProps {
  onClose: () => void;
}

const DropDownHome: React.FC<DropDownMenuProps> = ({ onClose }) => {
  const user = useCurrentUser();
  const router = useRouter();

  const handleRedirect = (page: string): void => {
    // Construct the URL with query parameters as part of the string
    onClose();
    router.push(`/sdlc?page=${page}`);
  };

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div className="mt-10 w-screen h-screen bg-white px-4 absolute right-0 xl:hidden">
      <div className="mt-10 flex flex-col">
        <Button
          variant="ghost"
          className="rounded-full flex items-center relative"
        >
          <GoBell className="w-5 h-5 absolute left-20 md:left-64" color="#475569" />
          Notifications
        </Button>
        <Button
          variant="ghost"
          className="rounded-full flex items-center relative"
        >
          <GoInbox className="w-5 h-5 absolute left-20 md:left-64" color="#475569" />
          Inbox
        </Button>
        <Button
          variant="ghost"
          className="rounded-full flex items-center relative"
        >
          <GoGoal className="w-5 h-5 absolute left-20 md:left-64" color="#475569" />
          Tasks
        </Button>
        <Button
          variant="ghost"
          className="rounded-full flex items-center relative"
        >
          <GoVersions className="w-5 h-5 absolute left-20 md:left-64" color="#475569" />
          Version
        </Button>

        <Button
          variant="ghost"
          className="rounded-full flex items-center relative"
        >
          <Avatar className="w-5 h-5 absolute left-20 md:left-64">
            <AvatarImage height={28} width={28} src={user?.image || ""} />
            <AvatarFallback>
              <FaUser />
            </AvatarFallback>
          </Avatar>
          <p className="absolute">Profile</p>
        </Button>

        <div className="pt-12">
          <div className="space-y-4 flex flex-col px-4 mb-4 md:left-64">
            <Link href="/auth/login">
              <Button className="w-full">Log Out</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropDownHome;
