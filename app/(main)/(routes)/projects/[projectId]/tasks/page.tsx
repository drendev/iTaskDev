import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

import AllTasksCard from "@/components/task-list/alltaskscard";
import AssignedToYouCard from "@/components/task-list/assignedtoyoucard";
import TasksListHeader from "@/components/task-list/taskslistheader";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

  // const taskInformation = await db.task.findMany({
  //   where: {
  //     projectId: params.projectId,
  //   },
  // });

  // if (!taskInformation) {
  //   return redirect("/unauthorized");
  // }

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
      <div className="grid grid-cols-6">
        {/* All Tasks sorted chronologically with deadline */}
      </div>

      {/*  */}
    </div>
  );
};

export default TaskList;
