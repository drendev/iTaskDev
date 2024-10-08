import Link from "next/link";

import PlaceholderContent from "@/components/admin-panel/placeholder-content";

import ProjectList from "@/components/projects/main/projectlist";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ChartNoAxesColumnDecreasingIcon } from "lucide-react";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/auth/login");
  }

  const project = await db.projectInformation.findMany({
    where: {
      workspace: {
        members: {
          some: {
            userId: user.id,
          },
        },
      },
    },
    orderBy: {
      dueDate: "asc",
    },
    select: {
      workspace: {
        select: {
          id: true,
          name: true,
          sdlc: true,
        },
      },
    },
    take: 3
  });

  setTimeout(() => console.log(project), 3000);

  return <PlaceholderContent project={project} />;
}
