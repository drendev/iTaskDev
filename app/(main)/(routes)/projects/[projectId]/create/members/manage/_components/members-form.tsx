"use client";

import { toast } from "sonner";
import { Check, Copy, Loader2, LockKeyholeIcon, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { useOrigin } from "@/hooks/use-origin";
import axios from "axios";

import { ProjectWithMembers } from "@/types";
import { useMembersQuery } from "@/hooks/use-members-query";
import { UserAvatar } from "@/app/(invite)/(routes)/pending/_components/user-avatar";
import { GoCheckCircle, GoXCircle } from "react-icons/go";

interface MembersFormPageProps {
    project: ProjectWithMembers;
}

export const MembersFormPage = ({
    project: initialProject
}: MembersFormPageProps) => {
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
    }

    const onNew = async () => {
        try {
            setIsLoading(true);
            const response = await axios.patch(`/api/workspaces/${project?.id}/invite-code`);
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
    }

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
    }

    const onApprove = async (pendingId: string, name: any) => {
        try {
            setLoadingId(pendingId);
            setIsLoading(true);
            const response = await axios.patch(`/api/workspaces/${project.id}/pending`, { pendingId });

            toast.success(`${name} has been approved`);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        } finally {
            setLoadingId("");
            setIsLoading(false);
        }
    }

    const onDecline = async (pendingId: string, name: any) => {
        try {
            setLoadingDeleteId(pendingId);
            setIsLoading(true);
            const response = await axios.delete(`/api/workspaces/${project.id}/pending`, { data: { pendingId } });

            toast.success(`${name} has been declined`);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        } finally {
            setLoadingId("");
            setIsLoading(false);
        }
    }

    return (
        <>
            <Label
                className="uppercase text-xs font-bold text-zinc-500"
            >
                Project Invite Link
            </Label>
            <div className="flex items-center mt-2 gap-x-2 max-w-[450px]">
                <Input
                    disabled={isLoading} 
                    className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                    value={inviteUrl}
                />
                <Button disabled={isLoading} onClick={onCopy} size="icon">
                    {copied 
                        ? <Check className="w-4 h-4" /> 
                        : <Copy className="w-4 h-4" />
                    }
                </Button>
            </div>
            <Button
                onClick={onNew}
                disabled={isLoading} 
                variant="link"
                size="sm"
                className="text-xs text-zinc-500 mt-4"
            >
                <RefreshCw className="w-4 h-4 mr-2"/>
                Generate a new link
            </Button>
            <Button
                onClick={onChangePrivacy}
                disabled={isLoading} 
                variant="link"
                size="sm"
                className="text-xs text-zinc-500 mt-4"
            >
                <LockKeyholeIcon className="w-4 h-4 mr-2"/>
                {project?.isPrivate ? "Make public" : "Make private"}
            </Button>

            <div className="text-md font-semibold mt-6">
                Current Members
            </div>

            {status === "pending" && (
                <div>Loading members...</div>
            )}

            {status === "success" && data?.members.length > 0 ? (
                data.members.map((member: any) => (
                    <div key={member.id} className="text-sm text-zinc-700 mt-2 flex items-center gap-2">
                        <UserAvatar
                        src={member.user.image || ""}
                        />
                        {member.user.name}
                    </div>
                ))
            ) : (
                status === "success" && data?.members.length === 0 && (
                    <div className="text-sm text-zinc-500 mt-2">No members found</div>
                )
            )}

            <div className="text-md font-semibold mt-6">
                Pending Members
            </div>
            {status === "success" && data?.pending.length > 0 ? (
                data.pending.map((member: any) => (
                    <div key={member.id} className="text-sm text-zinc-700 mt-2 flex items-center gap-x-2 mb-6 max-w-[450px]">
                        <UserAvatar
                        src={member.user.image || ""}
                        />
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
                        onClick={() => onApprove(member.user.id, member.user.name)}
                        disabled={isLoading}
                        variant="link"
                        >
                            <div className="flex flex-col gap-y-1 items-center">
                                {loadingId === member.user.id 
                                ? (<Loader2 className="animate-spin text-zinc-500 w-6 h-6" />) 
                                : <GoCheckCircle className="w-6 h-6 text-green-700" />}
                            <p className="text-[0.6rem] text-green-700">
                                Approve
                            </p>
                            </div>
                        </Button>
                        <Button
                        onClick={() => onDecline(member.user.id, member.user.name)}
                        variant="link"
                        disabled={isLoading}
                        >
                            <div className="flex flex-col gap-y-1 items-center">
                            {loadingDeleteId === member.user.id
                            ? (<Loader2 className="animate-spin text-zinc-500 w-6 h-6" />)
                            : <GoXCircle className="w-6 h-6 text-red-700" />}
                            <p className="text-[0.6rem] text-red-700">
                                Decline
                            </p>
                            </div>
                        </Button>
                        </div>
                    </div>
                ))
            ) : (
                status === "success" && data?.pending.length === 0 && (
                    <div className="text-sm text-zinc-500 mt-2">No pending members</div>
                )
            )}

            <Button >
                Proceed
            </Button>
        </>
    );
}
