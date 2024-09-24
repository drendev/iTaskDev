"use client";

import { CreateProjectModal } from "../modals/create-project-modal";
import { useEffect, useState } from "react";
import { InviteModal } from "../modals/invite-modal";
import { PendingModal } from "../modals/pending-modal";
import { MembersModal } from "../modals/members-modal";
import { EditProjectModal } from "../modals/edit-project-modal";
import { LeaveProjectModal } from "../modals/leave-project-modal";
import { DeleteProjectModal } from "../modals/delete-project-modal";
import { MessageFileModal } from "../modals/message-file-modal";
import { DeleteMessageModal } from "../modals/delete-message-modal";

export const Modals = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, []);

    if (!mounted) return null;

    return (
        <>
            <CreateProjectModal />
            <InviteModal />
            <PendingModal />
            <MembersModal />
            <EditProjectModal />
            <LeaveProjectModal />
            <DeleteProjectModal />
            <MessageFileModal />
            <DeleteMessageModal />
            
        </>
    );
}