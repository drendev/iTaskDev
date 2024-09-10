import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const LastAction = () => {
  return (
    <div className="flex flex-col items-center mt-10">
      <div className="font-medium 2xl:w-1/3 xl:w-1/2 md:w-2/3 lg:px-0 lg:mt-10 lg:text-6xl px-8 text-4xl xl:text-5xl flex justify-center text-center my-5">
        Start your software project now with iTaskDev.
      </div>
      <Image
        src="/samples/tea.gif"
        alt="tea"
        width={500}
        height={500}
        className="h-40 w-40"
      />
      <div className="flex gap-4 pt-6 items-center justify-center">
        <Link href={"/auth/login"}>
          <Button className="py-1">
            <div className="flex items-center justify-center">
              <div className="text-lg">Get Started</div>
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LastAction;
