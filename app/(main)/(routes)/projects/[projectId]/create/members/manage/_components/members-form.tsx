"use client";

import { toast } from "sonner";
import { Check, Copy, Loader2, LockKeyholeIcon, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useOrigin } from "@/hooks/use-origin";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

import { ProjectInformation } from "@prisma/client";

import { ProjectWithMembers } from "@/types";
import { useMembersQuery } from "@/hooks/use-members-query";
import { UserAvatar } from "@/app/(invite)/(routes)/pending/_components/user-avatar";
import { GoCheckCircle, GoXCircle } from "react-icons/go";
import { UsersRound } from "lucide-react";

import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MembersFormPageProps {
  project: ProjectWithMembers;
  projectId: string;
}

export const MembersFormPage = ({
  project: initialProject,
  projectId,
}: MembersFormPageProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [project, setProject] = useState(initialProject);
  const [loadingId, setLoadingId] = useState("");
  const [loadingDeleteId, setLoadingDeleteId] = useState("");

  const inviteUrl = `${useOrigin()}/invite/${project?.joinCode}`;

  const { data, status } = useMembersQuery({
    projectId: project?.id,
    queryKey: `members-${project?.id}`,
  });

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    toast.success("Successfully copied the invite link");

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/workspaces/${project?.id}/invite-code`
      );
      setProject((prev) => ({
        ...prev,
        joinCode: response.data.joinCode,
      }));
      toast.info("Generated a new invite link");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate a new invite link");
    } finally {
      setIsLoading(false);
    }
  };

  const onChangePrivacy = async () => {
    try {
      setIsLoading(true);
      let response;
      if (project?.isPrivate) {
        response = await axios.patch(`/api/workspaces/${project?.id}/public`);
        toast.info("Link privacy changed to public");
      } else {
        response = await axios.patch(`/api/workspaces/${project?.id}/private`);
        toast.info("Link privacy changed to private");
      }
      setProject((prev) => ({
        ...prev,
        isPrivate: !prev.isPrivate,
      }));
    } catch (error) {
      console.error(error);
      toast.error("Failed to change privacy setting");
    } finally {
      setIsLoading(false);
    }
  };

  const onApprove = async (pendingId: string, name: any) => {
    try {
      setLoadingId(pendingId);
      setIsLoading(true);
      const response = await axios.patch(
        `/api/workspaces/${project.id}/pending`,
        { pendingId }
      );

      toast.success(`${name} has been approved`);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setLoadingId("");
      setIsLoading(false);
    }
  };

  const onDecline = async (pendingId: string, name: any) => {
    try {
      setLoadingDeleteId(pendingId);
      setIsLoading(true);
      const response = await axios.delete(
        `/api/workspaces/${project.id}/pending`,
        { data: { pendingId } }
      );

      toast.success(`${name} has been declined`);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setLoadingId("");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-10">
            <div>
              <CardTitle className="flex items-center gap-3">
                <UsersRound size={30} />
                Manage Members
              </CardTitle>
              <CardDescription>Invite your team to the project</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger>
                <Button className="flex items-center gap-3">
                  <Plus size={20} className="text-white" /> Invite Link
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Project Invite Link</DialogTitle>
                  <DialogDescription>
                    <div>
                      <div className="flex items-center mt-2 gap-x-2 max-w-[450px]">
                        <Input
                          disabled={isLoading}
                          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          value={inviteUrl}
                        />
                        <Button
                          disabled={isLoading}
                          onClick={onCopy}
                          size="icon"
                        >
                          {copied ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <Button
                        onClick={onNew}
                        disabled={isLoading}
                        variant="link"
                        size="sm"
                        className="text-xs text-zinc-500 mt-4"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Generate a new link
                      </Button>
                      <Button
                        onClick={onChangePrivacy}
                        disabled={isLoading}
                        variant="link"
                        size="sm"
                        className="text-xs text-zinc-500 mt-4"
                      >
                        <LockKeyholeIcon className="w-4 h-4 mr-2" />
                        {project?.isPrivate ? "Make public" : "Make private"}
                      </Button>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2">
            <div className="p-5">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] text-md text-black font-semibold">
                      Members
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {status === "pending" &&
                    [...Array(3)].map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center space-x-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-[250px]" />
                              <Skeleton className="h-4 w-[200px]" />
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  {status === "success" && data?.members.length > 0
                    ? data.members.map((member: any) => (
                        <TableRow>
                          <TableCell>
                            <div
                              key={member.id}
                              className="text-sm text-zinc-700 mt-2 flex items-center gap-2"
                            >
                              <UserAvatar src={member.user.image || ""} />
                              {member.user.name}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    : status === "success" &&
                      data?.members.length === 0 && (
                        <div className="text-sm text-zinc-500 mt-2">
                          No members found
                        </div>
                      )}
                </TableBody>
              </Table>
            </div>
            <div className="p-5">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] text-md text-black font-semibold">
                      Pending Members
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {status === "pending" &&
                    [...Array(3)].map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center space-x-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-[250px]" />
                              <Skeleton className="h-4 w-[200px]" />
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  {status === "success" && data?.pending.length > 0 ? (
                    <TableRow>
                      {data.pending.map((member: any) => (
                        <div
                          key={member.id}
                          className="text-sm text-zinc-700 mt-2 flex items-center gap-x-2 mb-6 max-w-[450px]"
                        >
                          <UserAvatar src={member.user.image || ""} />
                          <div className="flex flex-col gap-y-1">
                            <div className="text-xs font-semibold flex items-center">
                              {member.user.name}
                            </div>
                            <p className="text-xs text-zinc-500">
                              {member.user.email}
                            </p>
                          </div>

                          <div className="ml-auto flex ">
                            <Button
                              onClick={() =>
                                onApprove(member.user.id, member.user.name)
                              }
                              disabled={isLoading}
                              variant="link"
                            >
                              <div className="flex flex-col gap-y-1 items-center">
                                {loadingId === member.user.id ? (
                                  <Loader2 className="animate-spin text-zinc-500 w-6 h-6" />
                                ) : (
                                  <GoCheckCircle className="w-6 h-6 text-green-700" />
                                )}
                                <p className="text-[0.6rem] text-green-700">
                                  Approve
                                </p>
                              </div>
                            </Button>
                            <Button
                              onClick={() =>
                                onDecline(member.user.id, member.user.name)
                              }
                              variant="link"
                              disabled={isLoading}
                            >
                              <div className="flex flex-col gap-y-1 items-center">
                                {loadingDeleteId === member.user.id ? (
                                  <Loader2 className="animate-spin text-zinc-500 w-6 h-6" />
                                ) : (
                                  <GoXCircle className="w-6 h-6 text-red-700" />
                                )}
                                <p className="text-[0.6rem] text-red-700">
                                  Decline
                                </p>
                              </div>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </TableRow>
                  ) : (
                    status === "success" &&
                    data?.pending.length === 0 && (
                      <TableRow>
                        <TableCell className="font-medium text-zinc-500">
                          No pending members
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="flex justify-end text-right">
            <Button
              className="mt-5"
              onClick={() =>
                router.push(`/projects/${projectId}/create/github`)
              }
            >
              Proceed
            </Button>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
};
