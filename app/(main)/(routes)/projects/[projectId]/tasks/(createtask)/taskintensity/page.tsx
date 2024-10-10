import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { TasksIntensity } from "./_components/render-tasks-intensity";

interface TaskIntensityProps {
  params: {
    projectId: string;
  };
}

const TaskIntensityPage = async ({ params }: TaskIntensityProps) => {
  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }

  const taskInformation = await db.task.findMany({
    where: {
      projectId: params.projectId,
    },
  });

  if (!taskInformation) {
    return redirect("/unauthorized");
  }

  return (
    <div className="m-4">
      <TasksIntensity info={taskInformation} />
    </div>
  );
};

export default TaskIntensityPage;
