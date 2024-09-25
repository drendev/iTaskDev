import Link from "next/link";

import PlaceholderContent from "@/components/admin-panel/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";


export default function DashboardPage() {
  return (
    <ContentLayout title="Dashboard">
      <PlaceholderContent />
    </ContentLayout>
  );
}
