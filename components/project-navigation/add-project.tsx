"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

export const NavigationAction = () => {
    const { onOpen } = useModal();

    return(
        <div>
            <Button onClick={() => onOpen("createProject")}>
                Create Project
            </Button>
        </div>
    )
}