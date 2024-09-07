import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";

import Link from "next/link";

import {
  BarChart,
  Code,
  DollarSign,
  Headphones,
  PaintBucket,
  Settings,
  UserPlus,
} from "lucide-react";

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
                <BarChart className="h-5 w-5 mr-2 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>
                <Code className="h-5 w-5 mr-2 text-orange-400" />
              </div>
              <div>Code</div>
            </Link>
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>
                <DollarSign className="h-5 w-5 mr-2 text-orange-400" />
              </div>
              <div>Growth</div>
            </Link>
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>
                <Headphones className="h-5 w-5 mr-2 text-orange-400" />
              </div>
              <div>Conference</div>
            </Link>
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>
                <PaintBucket className="h-5 w-5 mr-2 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>
                <UserPlus className="h-5 w-5 mr-2 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>
                <BarChart className="h-5 w-5 mr-2 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="mt-6 border-b" value="item-2">
          <AccordionTrigger>For Business</AccordionTrigger>
          <AccordionContent className="space-y-2">
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>
                <BarChart className="h-5 w-5 mr-2 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>
                <Code className="h-5 w-5 mr-2 text-orange-400" />
              </div>
              <div>Code</div>
            </Link>
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>
                <DollarSign className="h-5 w-5 mr-2 text-orange-400" />
              </div>
              <div>Growth</div>
            </Link>
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>
                <Headphones className="h-5 w-5 mr-2 text-orange-400" />
              </div>
              <div>Conference</div>
            </Link>
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>
                <PaintBucket className="h-5 w-5 mr-2 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>
                <UserPlus className="h-5 w-5 mr-2 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>
                <BarChart className="h-5 w-5 mr-2 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="mt-6 border-b" value="item-3">
          <AccordionTrigger>For Customers</AccordionTrigger>
          <AccordionContent className="space-y-2">
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>
                <BarChart className="h-5 w-5 mr-2 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>
                <Code className="h-5 w-5 mr-2 text-orange-400" />
              </div>
              <div>Code</div>
            </Link>
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>
                <DollarSign className="h-5 w-5 mr-2 text-orange-400" />
              </div>
              <div>Growth</div>
            </Link>
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>
                <Headphones className="h-5 w-5 mr-2 text-orange-400" />
              </div>
              <div>Conference</div>
            </Link>
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>
                <PaintBucket className="h-5 w-5 mr-2 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>
                <UserPlus className="h-5 w-5 mr-2 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>
                <BarChart className="h-5 w-5 mr-2 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="mt-6 border-b" value="item-4">
          <AccordionTrigger>For Entrepreneurs</AccordionTrigger>
          <AccordionContent className="space-y-2">
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>
                <BarChart className="h-5 w-5 mr-2 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>
                <Code className="h-5 w-5 mr-2 text-orange-400" />
              </div>
              <div>Code</div>
            </Link>
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>
                <DollarSign className="h-5 w-5 mr-2 text-orange-400" />
              </div>
              <div>Growth</div>
            </Link>
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>
                <Headphones className="h-5 w-5 mr-2 text-orange-400" />
              </div>
              <div>Conference</div>
            </Link>
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>
                <PaintBucket className="h-5 w-5 mr-2 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>
                <UserPlus className="h-5 w-5 mr-2 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
            <Link href="/ecommerce" className="flex" onClick={handleLinkClick}>
              <div>
                <BarChart className="h-5 w-5 mr-2 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
          </AccordionContent>
        </AccordionItem>

        <Link href={"/"} className="flex flex-1 items-center justify-between p-6 border-b">
          Pricing
        </Link>
        <Link href={"/"} className="flex flex-1 items-center justify-between p-6 border-b">
          Request a demo
        </Link>
      </Accordion>

      <div className="pt-12">
        <div className="space-y-4 flex flex-col px-4 mb-4">
          <Button className="w-full">
            Sign in to iTaskDev
          </Button>
        </div>

      </div>
    </div>
  );
};

export default DropDownMenu;
