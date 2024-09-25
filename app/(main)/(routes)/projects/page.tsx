import { getProjects } from "./_components/get-projects";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export default function ProjectPage() {
  const projects = getProjects();
  return (
    <ContentLayout title="Projects">
      <div>{projects}</div>
    </ContentLayout>
  );
}
