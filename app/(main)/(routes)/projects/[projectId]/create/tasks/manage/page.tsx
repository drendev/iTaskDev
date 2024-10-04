import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { RenderTasks } from "./render-tasks";
import ProgressBar from "../../information/manage/_components/progressbar";

interface ManageTasksPageProps {
  params: {
    projectId: string;
  };
}

const ManageInformationPage = async ({ params }: ManageTasksPageProps) => {
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
      <ProgressBar progress={65} />
      <RenderTasks info={taskInformation} />
    </div>
  );
};

export default ManageInformationPage;
