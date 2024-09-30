import { Navbar } from "@/components/admin-panel/navbar";

interface ContentLayoutProps {
  children: React.ReactNode;
}

export function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <div>
      <Navbar />
      <div className="container pb-8 px-4 sm:px-8">{children}</div>
    </div>
  );
}
