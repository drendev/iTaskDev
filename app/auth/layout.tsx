
import { Toaster } from "@/components/ui/sonner";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-gray-100">
      <Toaster />
      {children}
    </div>
  )
};

export default AuthLayout;
