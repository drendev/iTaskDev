import Link from "next/link";

import PlaceholderContent from "@/components/admin-panel/placeholder-content";

import ProjectList from "@/components/projects/main/projectlist";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";



export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/auth/login");
  }

  const project = await db.workspace.findMany({
    where: {
      members: {
        some: {
          userId: user.id,
        },
      },
    },
  });


  return <PlaceholderContent />;
}
