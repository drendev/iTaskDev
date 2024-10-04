"use client";

import { ProjectSdlc } from "@prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Loader2, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

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
import { useRouter } from "next/navigation";
import { useState } from "react";

interface RenderSdlcProps {
  sdlc: string;
  info: ProjectSdlc;
  projectId: string;
}

const sdlcTemp = [
  {
    sdlc: "WATERFALL",
    color: "text-blue-500",
    colorbg: "bg-blue-500",
    img: "/sdlc/waterfall.png",
    desc: "The Waterfall SDLC is a linear and sequential software development methodology where each phase (requirements, design, implementation, testing, deployment, and maintenance) must be completed before moving to the next.",
  },
  {
    sdlc: "SCRUM",
    color: "text-amber-500",
    colorbg: "bg-amber-500",
    img: "/sdlc/scrum.png",
    desc: "Scrum SDLC is an agile framework that organizes development into short, iterative cycles called sprints, focusing on collaboration, flexibility, and continuous delivery of functional software.",
  },
  {
    sdlc: "KANBAN",
    color: "text-cyan-500",
    colorbg: "bg-cyan-500",
    img: "/sdlc/kanban.png",
    desc: "Kanban SDLC is an agile methodology that emphasizes continuous delivery, visualizing work on a board to manage workflow, limit work in progress, and improve efficiency.",
  },
  {
    sdlc: "SPIRAL",
    color: "text-rose-500",
    colorbg: "bg-rose-500",
    img: "/sdlc/spiral.png",
    desc: "The Spiral SDLC is an iterative software development model that combines elements of both design and prototyping, emphasizing risk analysis and repeating phases in spirals for continuous refinement.",
  },
  {
    sdlc: "V-SHAPE",
    color: "text-pink-500",
    colorbg: "bg-pink-500",
    img: "/sdlc/vshape.png",
    desc: "The V-Shape SDLC is a sequential development model where each development phase is paired with a corresponding testing phase, emphasizing early testing and validation through a V-shaped process.",
  },
  {
    sdlc: "LEAN",
    color: "text-red-500",
    colorbg: "bg-red-500",
    img: "/sdlc/lean.png",
    desc: "Lean SDLC is a development methodology focused on maximizing value by eliminating waste, improving efficiency, and delivering software quickly with continuous feedback and improvement.",
  },
  {
    sdlc: "DEVOPS",
    color: "text-fuchsia-500",
    colorbg: "bg-fuchsia-500",
    img: "/sdlc/devops.png",
    desc: "DevOps SDLC is a collaborative methodology that integrates development and operations teams to automate, streamline, and continuously improve the software development and deployment process, ensuring faster and more reliable releases.",
  },
  {
    sdlc: "ITERATIVE",
    color: "text-lime-500",
    colorbg: "bg-lime-500",
    img: "/sdlc/iterative.png",
    desc: "Iterative SDLC is a development approach where the software is built and refined through repeated cycles, allowing for incremental improvements and early feedback at each iteration.",
  },
  {
    sdlc: "RAD",
    color: "text-teal-500",
    colorbg: "bg-teal-500",
    img: "/sdlc/rad.png",
    desc: "RAD (Rapid Application Development) SDLC is a model focused on quick development through iterative prototyping, user feedback, and minimal planning to rapidly deliver functional software.",
  },
];

export const RenderSdlc = ({ sdlc, info, projectId }: RenderSdlcProps) => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const onClick = async () => {
    router.push(`/projects/${projectId}/create/tasks`);
    setLoading(true);
  };

  return (
    <>
      {sdlcTemp.map((method, index) => {
        // Conditional rendering if sdlc matches the method's sdlc field
        if (sdlc.toLowerCase().includes(method.sdlc.toLowerCase())) {
          return (
            <div key={index}>
              <Card className="w-full mt-5">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <RefreshCcw size={50} />
                    <CardTitle>Get your SDLC</CardTitle>
                  </div>
                  <CardDescription>
                    Carefully analyzed and compared with the power of NLP
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center">
                    <Card className="w-[500px] shadow-lg">
                      <CardHeader>
                        <CardTitle
                          className={`semi-bold text-4xl items-center justify-center mx-auto my-5 ${method.color}`}
                        >
                          {method.sdlc}
                        </CardTitle>
                        <CardDescription>{method.desc}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Image
                          src={method.img}
                          alt={method.sdlc}
                          width={500}
                          height={500}
                          className="items-center justify-center mx-auto my-5 w-72"
                        />
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="default"
                              className={`flex items-center justify-center mt-10 mx-auto ${method.colorbg}`}
                            >
                              Show Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="overflow-y-scroll lg:min-w-[800px] lg:h-[500px] py-10">
                            <DialogHeader>
                              <DialogTitle className="text-2xl">
                                {method.sdlc}
                              </DialogTitle>
                              <DialogDescription>
                                {method.desc}
                              </DialogDescription>
                            </DialogHeader>
                            <Card className="w-full mt-5">
                              <CardHeader>
                                <CardTitle className="text-lg">
                                  Project Scope and Complexity
                                </CardTitle>
                                <CardDescription>
                                  What is the scope of the project?
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="text-sm">
                                {info.scopeComplex}
                              </CardContent>
                              <CardFooter className="flex justify-between"></CardFooter>
                            </Card>
                            <Card className="w-full mt-5">
                              <CardHeader>
                                <CardTitle className="text-lg">
                                  Timeline
                                </CardTitle>
                                <CardDescription>
                                  What is the timeframe of the development?
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="text-sm">
                                {info.timeline}
                              </CardContent>
                              <CardFooter className="flex justify-between"></CardFooter>
                            </Card>
                            <Card className="w-full mt-5">
                              <CardHeader>
                                <CardTitle className="text-lg">
                                  Team Size
                                </CardTitle>
                                <CardDescription>
                                  How many members are in the team?
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="text-sm">
                                {info.teamSize}
                              </CardContent>
                              <CardFooter className="flex justify-between"></CardFooter>
                            </Card>

                            {/*  */}
                            <Card className="w-full mt-5">
                              <CardHeader>
                                <CardTitle className="text-lg">
                                  Client Involvement
                                </CardTitle>
                                <CardDescription>
                                  How often does the client check the
                                  development progress?
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="text-sm">
                                {info.clientInvolvement}
                              </CardContent>
                              <CardFooter className="flex justify-between"></CardFooter>
                            </Card>
                            <Card className="w-full mt-5">
                              <CardHeader>
                                <CardTitle className="text-lg">
                                  Scope and Requirements Stability
                                </CardTitle>
                                <CardDescription>
                                  How fixed are the scopes and requirements that
                                  was planned in the preparation phase?
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="text-sm">
                                {info.scopeAndRequirements}
                              </CardContent>
                              <CardFooter className="flex justify-between"></CardFooter>
                            </Card>
                            <Card className="w-full mt-5">
                              <CardHeader>
                                <CardTitle className="text-lg">
                                  Quality Assurance and Testing
                                </CardTitle>
                                <CardDescription>
                                  How often are the system tested?
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="text-sm">
                                {info.qualityAssurance}
                              </CardContent>
                              <CardFooter className="flex justify-between"></CardFooter>
                            </Card>
                            <Card className="w-full mt-5">
                              <CardHeader>
                                <CardTitle className="text-lg">
                                  Resource Availability
                                </CardTitle>
                                <CardDescription>
                                  Are the resources sufficient for development?
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="text-sm">
                                {info.resourceAvailability}
                              </CardContent>
                              <CardFooter className="flex justify-between"></CardFooter>
                            </Card>

                            <Card className="w-full mt-5">
                              <CardHeader>
                                <CardTitle className="text-lg">
                                  Maintenance and Post-Deployment Support
                                </CardTitle>
                                <CardDescription>
                                  How is the system maintained after deployment?
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="text-sm">
                                {info.maintenance}
                              </CardContent>
                              <CardFooter className="flex justify-between"></CardFooter>
                            </Card>

                            <Card className="w-full mt-5">
                              <CardHeader>
                                <CardTitle className="text-lg">
                                  Risk and Uncertainty
                                </CardTitle>
                                <CardDescription>
                                  How risky is the project?
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="text-sm">
                                {info.risk}
                              </CardContent>
                              <CardFooter className="flex justify-between"></CardFooter>
                            </Card>

                            <DialogFooter>
                              <DialogClose asChild>
                                <Button type="button" variant="default">
                                  Close
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </CardContent>
                    </Card>

                    {/*  */}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between mt-3">
                  <div></div>
                  <Button
                    onClick={onClick}
                    disabled={loading}
                    className="mt-10 w-40"
                  >
                    Proceed
                  </Button>
                </CardFooter>
              </Card>
            </div>
          );
        }
        return null; // Return null if there's no match to avoid rendering
      })}
    </>
  );
};
