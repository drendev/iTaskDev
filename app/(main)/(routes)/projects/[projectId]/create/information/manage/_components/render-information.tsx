"use client";

import { ProjectInformation } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface RenderInformationProps {
    info: ProjectInformation,
}

export const RenderInformation = ({
    info,
}: RenderInformationProps) => {
    const router = useRouter();
    
    const onSubmit = async () => {
        console.log("CLicked");
        try {
            const response = await axios.post(
            '/api/openapi',
            {
                description: info.description,
                dueDate: info.dueDate.toString(),
                members: info.members,
                deployment: info.deployment.toString(),
                clientInvolvement: info.clientInvolvement.toString(),
                complexFeatures: info.complexFeatures.toString(),
                tasks: info.tasks,
                testing: info.testing,
                projectId: info.workspaceId
            }
            );
            router.push(`/projects/${info.workspaceId}/create/sdlc`);
            console.log(response);

            } catch (error) {
                console.log(error);
            }
    };
    
    return (
        <div className="flex flex-col">
            <div>
                Project Description: {info.description}
            </div>
            <div>
                Project Due Date: {info.dueDate.toString()}
            </div>
            <div>
                Project Members: {info.members}
            </div>
            <div>
                Project Deployment: {info.deployment.toString()}
            </div>
            <div>
                Project Client Involvement: {info.clientInvolvement.toString()}
            </div>
            <div>
                Project Complex Features: {info.complexFeatures.toString()}
            </div>
            <div>
                Project Number of Tasks: {info.tasks}
            </div>
            <div>
                Project Testing: {info.testing}
            </div>
            <Button className="w-40" onClick={onSubmit}>
                Proceed
            </Button>
        </div>
    )
}