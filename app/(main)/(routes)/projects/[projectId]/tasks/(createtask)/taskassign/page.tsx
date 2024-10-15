import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import AssignedMembersForm from "./_components/assigned-members-form";
import UserTasks from "../../_components/user-tasks";

interface AssignMembersProps {
  params: {
    projectId: string;
  };
}

const TaskAssign = async ({ params }: AssignMembersProps) => {
  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }

  return (
    <div className="m-4">
      <AssignedMembersForm />
    </div>
  );
};

export default TaskAssign;
