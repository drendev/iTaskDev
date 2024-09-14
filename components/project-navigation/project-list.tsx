"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';


interface ProjectItemProps {
    id: string;
    name: string;
}

export const ProjectList = ({
    id,
    name
}: ProjectItemProps) => {

    const router = useRouter();

    return(
        <div>
            <Link href={`/projects/${id}`}>
                {name}
            </Link>
        </div>
    )
}