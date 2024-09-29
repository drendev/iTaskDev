
import ProjectList from "@/components/projects/main/projectlist";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";


export default async function App() {
  const user = await currentUser();

  if (!user) {
    redirect("/auth/login");
  }

  const project = await db.workspace.findMany({
    where: {
      userId: user.id,
      OR: [
        {
          members: {
            some: {
              userId: user.id,
            }
          }
        }
      ]
    },
  })

  return (
    <div>
      <ProjectList
      project={project}
      />
    </div>
  );
}
