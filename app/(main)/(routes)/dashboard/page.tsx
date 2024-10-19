import Link from "next/link";

import PlaceholderContent from "@/components/admin-panel/placeholder-content";

import ProjectList from "@/components/projects/main/projectlist";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ChartNoAxesColumnDecreasingIcon } from "lucide-react";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Project with nearest deadlines
  const project = await db.projectInformation.findMany({
    where: {
      workspace: {
        members: {
          some: {
            userId: user.id,
          },
        },
      },
    },
    orderBy: {
      dueDate: "asc",
    },
    select: {
      dueDate: true,
      workspace: {
        select: {
          id: true,
          name: true,
          sdlc: true,
        },
      },
    },
    take: 3,
  });

  // Recently completed tasks of the user
  const recentlyCompletedTasks = await db.task.findMany({
    where: {
      members: {
        some: {
          member: {
            userId: user.id,
          },
        },
      },
    },
    include: {
      workspace: {
        include: {
          info: true,
        },
      },
    },
  });

  const recentCompTasks = recentlyCompletedTasks.map((task) => {
    return {
      taskContent: task.content,
      taskDateCompleted: task.DateCompleted,
      taskStatus: task.Status,
      projectName: task.workspace.name,
      projectSDLC: task.workspace.sdlc,
    };
  });

  console.log(recentCompTasks);

  // Projects with highest progress

  const projectMostProgress = await db.workspace.findMany({
    where: {
      members: {
        some: {
          userId: user.id,
        },
      },
    },
    include: {
      tasks: true,
    },
  });

  const ProjMostProgInfo = projectMostProgress.map((project) => {
    return {
      projectName: project.name,
      projectSDLC: project.sdlc,
      taskStatus: project.tasks.map((task) => {
        return {
          status: task.Status,
        };
      }),
    };
  });

  return (
    <PlaceholderContent
      project={project}
      tasks={recentCompTasks}
      progress={ProjMostProgInfo}
    />
  );
}
