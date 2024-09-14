import { getProjects } from  './_components/get-projects'

export default function ProjectPage() {
    return (
        <div>
            {getProjects()}
        </div>
    )
}