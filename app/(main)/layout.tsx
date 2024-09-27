import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import ToastHandler from "../(invite)/(routes)/invite/_components/toast-handler";
import { Modals } from "@/components/providers/modal-provider";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (<div>
    <AdminPanelLayout>
        <ToastHandler />
        <Modals />
        {children}
    </AdminPanelLayout>;
  </div>
);
}
