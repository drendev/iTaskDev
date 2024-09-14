"use client";

import Link from 'next/link';

interface ProjectItemProps {
    id: string;
    name: string;
}

export const ProjectList = ({
    id,
    name
}: ProjectItemProps) => {

    return(
        <div>
            <Link href={`/projects/${id}`}>
                {name}
            </Link>
        </div>
    )
}