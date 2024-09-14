
interface ProjectIdPageProps {
    params: {
        projectId: string;
    }
}

const ProjectIdPage = ({ params }: ProjectIdPageProps) => {
    return (
        <div className="mt-6 text-6xl">
            Kupal ka ba?
        </div>
    )
}

export default ProjectIdPage;