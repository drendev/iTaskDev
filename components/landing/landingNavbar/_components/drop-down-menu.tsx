import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";

import Link from "next/link";

import {
  PiCode,
  PiHeadsetLight,
  PiCalendarDotsLight,
  PiSparkleLight,
} from "react-icons/pi";

import { useRouter } from "next/navigation";

interface DropDownMenuProps {
  onClose: () => void;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ onClose }) => {
  const router = useRouter();

  const handleRedirect = (page: string): void => {
    // Construct the URL with query parameters as part of the string
    onClose();
    router.push(`/sdlc?page=${page}`);
  };

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div className="mt-9 w-screen h-screen bg-white px-4 items-center justify-center absolute right-0 xl:hidden">
      <Accordion
        defaultValue={"item-1"}
        className="pl-2"
        type="single"
        collapsible
      >
        <AccordionItem className="mt-6 border-b" value="item-1">
          <AccordionTrigger>Use cases</AccordionTrigger>
          <AccordionContent defaultValue={"item-1"} className="space-y-2">
            <Link href="/#projects" className="flex" onClick={handleLinkClick}>
              <div>
                <PiCode className="h-5 w-5 mr-2 text-blue-400" />
              </div>
              <div>Projects</div>
            </Link>
            <Link
              href="/#communication"
              className="flex"
              onClick={handleLinkClick}
            >
              <div>
                <PiHeadsetLight className="h-5 w-5 mr-2 text-red-400" />
              </div>
              <div>Communication</div>
            </Link>
            <Link href="/#calendar" className="flex" onClick={handleLinkClick}>
              <div>
                <PiCalendarDotsLight className="h-5 w-5 mr-2 text-indigo-400" />
              </div>
              <div>Calendar</div>
            </Link>
            <Link href="/#ai" className="flex" onClick={handleLinkClick}>
              <div>
                <PiSparkleLight className="h-5 w-5 mr-2 text-purple-400" />
              </div>
              <div>AI</div>
            </Link>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="mt-6 border-b" value="item-2">
          <AccordionTrigger>SDLC Library</AccordionTrigger>
          <AccordionContent className="space-y-2">
            <div
              className="flex border-l-4 border-blue-500 rounded-none pl-3 hover:cursor-pointer"
              onClick={() => handleRedirect("waterfall")}
            >
              <div>Waterfall</div>
            </div>
            <div
              className="flex border-l-4 border-amber-500 rounded-none pl-3 hover:cursor-pointer"
              onClick={() => handleRedirect("scrum")}
            >
              <div>Scrum</div>
            </div>
            <div
              className="flex border-l-4 border-cyan-500 rounded-none pl-3 hover:cursor-pointer"
              onClick={() => handleRedirect("kanban")}
            >
              <div>Kanban</div>
            </div>
            <div
              className="flex border-l-4 border-rose-500 rounded-none pl-3 hover:cursor-pointer"
              onClick={() => handleRedirect("spiral")}
            >
              <div>Spiral</div>
            </div>
            <div
              className="flex border-l-4 border-pink-500 rounded-none pl-3 hover:cursor-pointer"
              onClick={() => handleRedirect("vshape")}
            >
              <div>V-Shape</div>
            </div>
            <div
              className="flex border-l-4 border-red-500 rounded-none pl-3 hover:cursor-pointer"
              onClick={() => handleRedirect("lean")}
            >
              <div>Lean</div>
            </div>
            <div
              className="flex border-l-4 border-violet-500 rounded-none pl-3 hover:cursor-pointer"
              onClick={() => handleRedirect("devops")}
            >
              <div>DevOps</div>
            </div>
            <div
              className="flex border-l-4 border-lime-500 rounded-none pl-3"
              onClick={() => handleRedirect("iterative")}
            >
              <div>Iterative</div>
            </div>
            <div
              className="flex border-l-4 border-teal-500 rounded-none pl-3"
              onClick={() => handleRedirect("rad")}
            >
              <div>RAD</div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="pt-12">
        <div className="space-y-4 flex flex-col px-4 mb-4">
          <Link href="/auth/login">
            <Button className="w-full">Sign in to iTaskDev</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DropDownMenu;
