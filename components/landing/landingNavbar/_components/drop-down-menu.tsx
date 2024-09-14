import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";

import Link from "next/link";

import {
  Code,
  DollarSign,
  Headphones,
} from "lucide-react";

import {
  PiCode,
} from "react-icons/pi";


interface DropDownMenuProps {
  onClose: () => void;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ onClose }) => {
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
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>
                <PiCode className="h-5 w-5 mr-2 text-blue-400" />
              </div>
              <div>Projects</div>
            </Link>
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>
                <Code className="h-5 w-5 mr-2 text-red-400" />
              </div>
              <div>Communication</div>
            </Link>
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>
                <DollarSign className="h-5 w-5 mr-2 text-indigo-400" />
              </div>
              <div>Calendar</div>
            </Link>
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>
                <Headphones className="h-5 w-5 mr-2 text-purple-400" />
              </div>
              <div>AI</div>
            </Link>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="mt-6 border-b" value="item-2">
          <AccordionTrigger>Resources</AccordionTrigger>
          <AccordionContent className="space-y-2">
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>User Manual</div>
            </Link>
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>Documentation</div>
            </Link>
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>Video Demo</div>
            </Link>
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>About the developers</div>
            </Link>
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
