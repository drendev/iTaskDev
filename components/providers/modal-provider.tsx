"use client";

import { CreateProjectModal } from "../modals/create-project-modal";
import { useEffect, useState } from "react";
import { InviteModal } from "../modals/invite-modal";
import { PendingModal } from "../modals/pending-modal";
import { MembersModal } from "../modals/members-modal";

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
        </>
    );
}