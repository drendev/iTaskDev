import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import ToastHandler from "../(invite)/(routes)/invite/_components/toast-handler";
import { Modals } from "@/components/providers/modal-provider";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Toaster } from "@/components/ui/sonner";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AdminPanelLayout>
        <ToastHandler />
        <Toaster />
        <Modals />
        <ContentLayout>{children}</ContentLayout>
      </AdminPanelLayout>
    </div>
  );
}
