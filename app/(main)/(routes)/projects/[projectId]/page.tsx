
interface ProjectIdPageProps {
    params: {
        projectId: string;
    }
}

const ProjectIdPage = ({ params }: ProjectIdPageProps) => {
    return (
        <div>
            ID: {params.projectId}
        </div>
    )
}

export default ProjectIdPage;