"use client";

import { ProjectWithMembers, ProjectWithPending } from "@/types";
import { MemberRole } from "@prisma/client";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal-store";
import {
  GoPencil,
  GoPerson,
  GoPersonAdd,
  GoPlusCircle,
  GoTrash,
} from "react-icons/go";
import { Badge } from "../ui/badge";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "../ui/separator";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, MessageCircle } from "lucide-react";
import Link from "next/link";

interface ProjectHeaderProps {
  project: ProjectWithMembers;
  role?: MemberRole;
  pending: ProjectWithPending;
}

export const ProjectHeader = ({
  project,
  role,
  pending,
}: ProjectHeaderProps) => {
  const { onOpen } = useModal();

  const isAdmin = role === MemberRole.ADMIN;

  return (
    <div>
      <div className="text-4xl my-10">{project.name}</div>
      <div className="flex space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none" asChild>
            <Button
              className="flex items-center px-3 focus:outline-none transition-all [&[data-state=open]>svg]:rotate-180"
              size="sm"
              variant="ghost"
            >
              Members Settings
              <ChevronDown className="h-5 w-5 ml-auto transition-transform duration-200" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52 text-xs font-medium space-y-[2px]">
            {isAdmin && (
              <>
                <DropdownMenuItem
                  onClick={() => onOpen("invite", { workspace: project })}
                >
                  <GoPlusCircle className="w-4 h-4 mr-2" />
                  Invite Members
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="relative"
                  onClick={() => onOpen("pending", { workspace: project })}
                >
                  <GoPersonAdd className="w-4 h-4 mr-2" />
                  Pending Approval{" "}
                  {pending.pending.length > 0 && (
                    <Badge
                      className="absolute -top-2 -right-2"
                      variant="destructive"
                    >
                      {pending.pending.length}
                    </Badge>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onOpen("members", { workspace: project })}
                >
                  <GoPerson className="w-4 h-4 mr-2" />
                  Manage Members
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => onOpen("editProject", { workspace: project })}
                >
                  <GoPencil className="w-4 h-4 mr-2" />
                  Edit Project
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    onOpen("deleteProject", { workspace: project })
                  }
                >
                  <GoTrash className="w-4 h-4 mr-2" />
                  Delete Project
                </DropdownMenuItem>
              </>
            )}
            {!isAdmin && (
              <div>
                <DropdownMenuItem
                  onClick={() => onOpen("leaveProject", { workspace: project })}
                >
                  <GoPencil className="w-4 h-4 mr-2" />
                  Leave Project
                </DropdownMenuItem>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none" asChild>
            <Button
              className="flex items-center px-3 focus:outline-none transition-all [&[data-state=open]>svg]:rotate-180"
              size="sm"
              variant="ghost"
            >
              Project Settings
              <ChevronDown className="h-5 w-5 ml-auto transition-transform duration-200" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52 text-xs font-medium space-y-[2px]">
            {isAdmin && (
              <>
                <DropdownMenuItem
                  onClick={() => onOpen("editProject", { workspace: project })}
                >
                  <GoPencil className="w-4 h-4 mr-2" />
                  Edit Project
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    onOpen("deleteProject", { workspace: project })
                  }
                >
                  <GoTrash className="w-4 h-4 mr-2" />
                  Delete Project
                </DropdownMenuItem>
              </>
            )}
            {!isAdmin && (
              <div>
                <DropdownMenuItem
                  onClick={() => onOpen("leaveProject", { workspace: project })}
                >
                  <GoPencil className="w-4 h-4 mr-2" />
                  Leave Project
                </DropdownMenuItem>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <Link href={`/projects/${project.id}/messages`}>
          <Button variant="ghost" className="items-center gap-2">
            <MessageCircle />
            Chat Beta
          </Button>
        </Link>
      </div>
      <Separator className="mt-5"/>
    </div>
  );
};
