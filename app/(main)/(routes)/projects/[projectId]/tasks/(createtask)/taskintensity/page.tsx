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

  

  return (
    <div className="m-4">
      <TasksIntensity />
    </div>
  );
};

export default TaskIntensityPage;
