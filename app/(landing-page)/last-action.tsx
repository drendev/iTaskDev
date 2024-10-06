import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const LastAction = () => {
  return (
    <div className="flex flex-col items-center mt-10">
      <div className="font-serif font-medium px-8 flex justify-center text-center my-5 text-3xl">
        “The best way to predict the future is to create it.”
      </div>
      <div className="font-serif font-medium px-8 mb-5 flex justify-center text-center text-xl">
        - Abraham Lincoln
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
