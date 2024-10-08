import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { MembersFormPage } from "./_components/members-form";
import ProgressBar from "../information/manage/_components/progressbar";
import { useRouter } from "next/navigation";

interface MembersPageProps {
  params: {
    projectId: string;
  };
}

const MembersPage = async ({ params }: MembersPageProps) => {
  const user = await currentUser();

  if (!user) {
    redirect("/auth/login");
  }

  const project = await db.workspace.findUnique({
    where: {
      id: params.projectId,
      userId: user.id,
    },
    include: {
      members: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!project) {
    return redirect("/unauthorized");
  }

  return (
    <div>
      <ProgressBar progress={82} />
      <MembersFormPage project={project} projectId={params.projectId} />
    </div>
  );
};

export default MembersPage;
