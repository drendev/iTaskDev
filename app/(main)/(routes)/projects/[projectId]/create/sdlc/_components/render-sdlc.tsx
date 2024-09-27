"use client";

import { ProjectSdlc } from "@prisma/client";

interface RenderSdlcProps {
    sdlc: string;
    info: ProjectSdlc
}

export const RenderSdlc = ({
    sdlc,
    info
}: RenderSdlcProps) => {
    return (
        <div className="flex flex-col">
            <div className="semi-bold text-zinc-500">
                Recommended Methodology: {sdlc.toUpperCase()}
            </div>
            <div>
                Timeline: {info.timeline}
            </div>
            <div>
                Team Size: {info.teamSize}
            </div>
            <div>
                Complex Features: {info.complexFeatures}
            </div>
            <div>
                Client Involvement: {info.clientInvolvement}
            </div>
            <div>
                Scope and Requireents: {info.scopeAndRequirements}
            </div>
            <div>
                Resource Availability: {info.resourceAvailability}
            </div>
            <div>
                Quality Assurance: {info.qualityAssurance}
            </div>
            <div>
                Deployment: {info.deployment}
            </div>
        </div>
    )
}
