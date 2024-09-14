import { getProjects } from  './_components/get-projects'

export default function ProjectPage() {
    const projects = getProjects();
    return (
        <div>
            {projects}
        </div>
    )
}