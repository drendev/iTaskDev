import { RecentCommitsCard } from "./_components/recent-commits";
import { ProjectTasksCard } from "./_components/project-tasks";
import { ProjectOverviewCard } from "./_components/project-overview";
import { TaskPerMonthCard } from "./_components/task-per-month";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { MemberList } from "@/components/project-navigation/member-list";

interface ProjectIdPageProps {
  params: {
    projectId: string;
  };
}

const ProjectIdPage = async ({ params }: ProjectIdPageProps) => {
  const user = await currentUser();

  if (!user) {
    redirect("/auth/login");
  }

  const projectOwner = await db.workspace.findUnique({
    where: {
      id: params.projectId,
    },
  });

  // project details
  const projectDetails = await db.projectInformation.findUnique({
    where: {
      workspaceId: params.projectId,
    },
  });

  if (!projectDetails) {
    if (projectOwner?.userId !== user.id) {
      redirect(`/projects/${params.projectId}/error`);
    }

    redirect(`/projects/${params.projectId}/create/information`);
  }

  // project sdlc
  const projectSdlc = await db.workspace.findUnique({
    where: {
      id: params.projectId,
    },
    select: {
      sdlc: true,
    },
  });

  if (!projectSdlc) {
    if (projectOwner?.userId !== user.id) {
      redirect(`/projects/${params.projectId}/error`);
    }

    redirect(`/projects/${params.projectId}/create/information/manage`);
  }

  // project repository
  const github = await db.workspace.findUnique({
    where: {
      id: params.projectId,
    },
    select: {
      repo: true,
      owner: true,
    },
  });

  if (!github) {
    if (projectOwner?.userId !== user.id) {
      redirect(`/projects/${params.projectId}/error`);
    }

    redirect(`/projects/${params.projectId}/create/github`);
  }

  const repo = github?.repo;
  const owner = github?.owner;

  if (!repo || !owner) {
    if (projectOwner?.userId !== user.id) {
      redirect(`/projects/${params.projectId}/error`);
    }

    redirect(`/projects/${params.projectId}/create/github`);
  }

  const project = await db.workspace.findUnique({
    where: {
      id: params.projectId,
      members: {
        some: {
          userId: user.id,
        },
      },
    },
  });

  return (
    <>
      <MemberList projectId={params.projectId} />
      <div className="grid grid-cols-4 mt-6 gap-5">
        <ProjectTasksCard projectId={params.projectId} />

        {/*  */}

        {/* Recent Commit Card */}

        <RecentCommitsCard
          repo={repo}
          owner={owner}
          projectId={params.projectId}
        />

        {/*  */}
        <TaskPerMonthCard projectId={params.projectId} />
      </div>
    </>
  );
};

export default ProjectIdPage;
