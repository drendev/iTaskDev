import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ChevronDown,
  AlignJustify,
  Grid2X2,
  Code,
  Scroll,
  FileCode,
  Cherry,
  Cloudy,
  Ellipsis,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const test = [
  {
    project: (
      <Link href="#" className="hover:underline flex items-center gap-3">
        <Code className="p-2 rounded-lg bg-amber-500 w-10 h-10 text-white" />
        iTaskDev Beta
      </Link>
    ),
    SDLC: "Scrum",
    openTest: "9 minutes ago",
  },
  {
    project: (
      <Link href="#" className="hover:underline flex items-center gap-3">
        <Scroll className="p-2 rounded-lg bg-blue-500 w-10 h-10 text-white" />
        SpeakWiz
      </Link>
    ),
    SDLC: "Waterfall",
    openTest: "1 day ago",
  },
  {
    project: (
      <Link href="#" className="hover:underline flex items-center gap-3">
        <FileCode className="p-2 rounded-lg bg-cyan-500 w-10 h-10 text-white" />
        DevLine
      </Link>
    ),
    SDLC: "Kanban",
    openTest: "2 days ago",
  },
  {
    project: (
      <Link href="#" className="hover:underline flex items-center gap-3">
        <Cherry className="p-2 rounded-lg bg-pink-500 w-10 h-10 text-white" />
        CherryTop
      </Link>
    ),
    SDLC: "V-Shape",
    openTest: "5 days ago",
  },
  {
    project: (
      <Link href="#" className="hover:underline flex items-center gap-3">
        <Cloudy className="p-2 rounded-lg bg-fuchsia-500 w-10 h-10 text-white" />
        iCloud
      </Link>
    ),
    SDLC: "DevOps",
    openTest: "10 days ago",
  },
];

const ProjectList = () => {
  const [layout, setLayout] = useState<string>("list");
  return (
    <>
      <div className="text-xl font-semibold ml-4">Projects</div>
      <div className="mt-5 flex justify-between">
        <div>
          <Button variant="ghost">
            Opened by you
            <ChevronDown className="ml-3" />
          </Button>
          <Button variant="ghost">
            Ascending
            <ChevronDown className="ml-3" />
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" onClick={() => setLayout("list")}>
            <AlignJustify />
          </Button>
          <Button variant="ghost" onClick={() => setLayout("grid")}>
            <Grid2X2 />
          </Button>
        </div>
      </div>

      {layout === "list" ? (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>SDLC</TableHead>
                <TableHead>Opened by you</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {test.map((proj, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{proj.project}</TableCell>
                  <TableCell>{proj.SDLC}</TableCell>
                  <TableCell>{proj.openTest}</TableCell>
                  <TableCell>
                    <Button variant="ghost">
                      <Ellipsis />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 mt-4">
          {test.map((proj, index) => (
            <Card className="mb-5 mr-5" key={index}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center text-lg">
                  {proj.project}
                  <Button variant="ghost">
                    <Ellipsis className="w-5 h-5" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{proj.SDLC}</p>
                <p className="text-gray-400">{proj.openTest}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default ProjectList;
