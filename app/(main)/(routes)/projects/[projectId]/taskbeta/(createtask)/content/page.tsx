import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

interface TaskContentPageProps {
  params: {
    projectId: string;
  };
}

export interface CreatedTaskId {
  id: string[];
}

const TaskContentPage = async ({ params }: TaskContentPageProps) => {
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

  return <div className="m-4"></div>;
};

export default TaskContentPage;
