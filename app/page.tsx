import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex h-full flex-col items-center justify-center">
        <div className="space-y-6 text-center">
            <h1 className="text-2xl font-semibold text-slate-800">
                iTaskDev
            </h1>
            <p className="text-lg">
               Under Development
            </p>
            <div>
                <Link href={"/auth/login"} className="text-slate-900 hover:text-slate-600 font-bold">
                    Sign In
                </Link>
            </div>
        </div>
      </main>
    </>
  );
}
