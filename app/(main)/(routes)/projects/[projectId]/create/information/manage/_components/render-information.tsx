"use client";

import { ProjectInformation } from "@prisma/client";

interface RenderInformationProps {
    info: ProjectInformation;
}

export const RenderInformation = ({
    info
}: RenderInformationProps) => {
    
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
        </div>
    )
}