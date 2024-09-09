"use client";

import { CreateProjectModal } from "../modals/create-project-modal";
import { useEffect, useState } from "react";

export const Modals = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, []);

    if (!mounted) return null;

    return (
        <>
            <CreateProjectModal />
        </>
    )
}