
import { RecentCommitsCard } from "./_components/recent-commits";
import { ProjectTasksCard } from "./_components/project-tasks";
import { ProjectOverviewCard } from "./_components/project-overview";
import { TaskPerMonthCard } from "./_components/task-per-month";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

interface ProjectIdPageProps {
  params: {
    projectId: string;
  };
}

const ProjectIdPage = async ({ params }: ProjectIdPageProps) => {
   const user = await currentUser();

   if (!user) {
    redirect('/auth/login');
   }

   const github = await db.workspace.findUnique({
    where: {
      id: params.projectId,
    },
    select: {
      repo: true,
      owner: true
    }
   })

   if (!github) {
     return // TODO
   }

   const repo = github?.repo;
   const owner = github?.owner;

   if (!repo || !owner) {
    return // TODO
   }
  
  return (
    <div className="grid grid-cols-4 mt-6 gap-5">

      <ProjectTasksCard 
      projectId={params.projectId} 
      />

      {/*  */}
      <ProjectOverviewCard 
      projectId={params.projectId} 
      />
      {/* Recent Commit Card */}

      <RecentCommitsCard
      repo={repo}
      owner={owner}
      projectId={params.projectId}
      />

      {/*  */}
      <TaskPerMonthCard
      projectId={params.projectId}
      />

    </div>
  );
};

export default ProjectIdPage;
