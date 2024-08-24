import Link from "next/link";
import {Button} from "@/components/ui/button";
import {LoginButton} from "@/components/auth/login-button";

export default function Home() {
  return (
    <>
      <main className="flex h-full flex-col items-center justify-center">
        <div className="space-y-6 text-center">
            <h1 className="text-2xl font-semibold text-slate-800">
                iTaskDev
            </h1>
            <p className="text-md">
               Under Development
            </p>
            <div>
                <LoginButton>
                    <Button variant="secondary" size="lg">
                        Sign in
                    </Button>
                </LoginButton>
            </div>
        </div>
      </main>
    </>
  );
}
