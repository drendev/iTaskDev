import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

import AllTasksCard from "@/components/task-list/alltaskscard";
import AssignedToYouCard from "@/components/task-list/assignedtoyoucard";
import TasksListHeader from "@/components/task-list/taskslistheader";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import UserTasks from "./_components/user-tasks";

interface TasksListsPageProps {
  params: {
    projectId: string;
  };
}

const TaskList = async ({ params }: TasksListsPageProps) => {
  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }

  const taskAssigned = await db.task.findMany({
    where: {
      projectId: params.projectId,
      members: {
        some: {
          member: {
            userId: user.id,
          },
        },
      },
    },
    include: {
      members: {
        include: {
          member: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  });

  const info = taskAssigned.map((task) => {
    return {
      taskId: task.id,
      taskContent: task.content,
      taskIntensity: task.Intensity,
      taskDateDue: task.DateDue,
      taskStatus: task.Status,
      taskMembers: task.members.map((member) => {
        return {
          memberId: member.member.userId,
          memberUsername: member.member.user.name,
          memberAvatar: member.member.user.image,
        };
      }),
    };
  });

  console.log(info);

  return (
    <div>
      {/* Header */}
      {/* CREATE TASK */}
      <Link href={`/projects/${params.projectId}/tasks/taskcontent`}>
        <Button>Add Task</Button>
      </Link>

      {/* TWO CARDS */}
      {/* Task List */}
      {/* Assigned to you */}
      <div className="grid mt-5">
        <UserTasks tasks={info} projectId={params.projectId} />
      </div>

      {/*  */}
    </div>
  );
};

export default TaskList;
