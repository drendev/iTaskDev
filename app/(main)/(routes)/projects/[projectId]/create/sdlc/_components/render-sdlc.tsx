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
import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ProgressBar from "../../information/manage/_components/progressbar";

interface RenderSdlcProps {
  sdlc: string;
  info: ProjectSdlc;
}

const sdlcTemp = [
  {
    sdlc: "waterfall",
    color: "text-blue-500",
    colorbg: "bg-blue-500",
    img: "/sdlc/waterfall.png",
    desc: "The Waterfall SDLC is a linear and sequential software development methodology where each phase (requirements, design, implementation, testing, deployment, and maintenance) must be completed before moving to the next.",
  },
  {
    sdlc: "scrum",
    color: "text-amber-500",
    colorbg: "bg-amber-500",
    img: "/sdlc/scrum.png",
    desc: "Scrum SDLC is an agile framework that organizes development into short, iterative cycles called sprints, focusing on collaboration, flexibility, and continuous delivery of functional software.",
  },
  {
    sdlc: "kanban",
    color: "#text-cyan-500",
    colorbg: "bg-cyan-500",
    img: "/sdlc/kanban.png",
    desc: "Kanban SDLC is an agile methodology that emphasizes continuous delivery, visualizing work on a board to manage workflow, limit work in progress, and improve efficiency.",
  },
  {
    sdlc: "spiral",
    color: "text-rose-500",
    colorbg: "bg-rose-500",
    img: "/sdlc/spiral.png",
    desc: "The Spiral SDLC is an iterative software development model that combines elements of both design and prototyping, emphasizing risk analysis and repeating phases in spirals for continuous refinement.",
  },
  {
    sdlc: "v-shape",
    color: "text-pink-500",
    colorbg: "bg-pink-500",
    img: "/sdlc/vshape.png",
    desc: "The V-Shape SDLC is a sequential development model where each development phase is paired with a corresponding testing phase, emphasizing early testing and validation through a V-shaped process.",
  },
  {
    sdlc: "lean",
    color: "text-red-500",
    colorbg: "bg-red-500",
    img: "/sdlc/lean.png",
    desc: "Lean SDLC is a development methodology focused on maximizing value by eliminating waste, improving efficiency, and delivering software quickly with continuous feedback and improvement.",
  },
  {
    sdlc: "devops",
    color: "text-fuschia-500",
    colorbg: "bg-fuschia-500",
    img: "/sdlc/devops.png",
    desc: "DevOps SDLC is a collaborative methodology that integrates development and operations teams to automate, streamline, and continuously improve the software development and deployment process, ensuring faster and more reliable releases.",
  },
  {
    sdlc: "iterative",
    color: "text-lime-500",
    colorbg: "bg-lime-500",
    img: "/sdlc/iterative.png",
    desc: "Iterative SDLC is a development approach where the software is built and refined through repeated cycles, allowing for incremental improvements and early feedback at each iteration.",
  },
  {
    sdlc: "rad",
    color: "text-teal-500",
    colorbg: "bg-teal-500",
    img: "/sdlc/rad.png",
    desc: "RAD (Rapid Application Development) SDLC is a model focused on quick development through iterative prototyping, user feedback, and minimal planning to rapidly deliver functional software.",
  },
];

export const RenderSdlc = ({ sdlc, info }: RenderSdlcProps) => {
  return (
    <>
      {sdlcTemp.map((method) => {
        // Conditional rendering if sdlc matches the method's sdlc field
        if (sdlc.toLowerCase() === method.sdlc.toLowerCase()) {
          return (
            <div>
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
                          {sdlc.toUpperCase()}
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
                              className={`flex mx-auto justify-center items-center my-5 ${method.colorbg}`}
                            >
                              Show Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="overflow-y-scroll lg:min-w-[800px] lg:h-[500px] py-10">
                            <DialogHeader>
                              <DialogTitle>{sdlc.toUpperCase()}</DialogTitle>
                              <DialogDescription>
                                {method.desc}
                              </DialogDescription>
                            </DialogHeader>
                            <Card className="w-full mt-5">
                              <CardHeader>
                                <CardTitle>Timeline</CardTitle>
                                <CardDescription>
                                  What is the timeframe of the development?
                                </CardDescription>
                              </CardHeader>
                              <CardContent>{info.timeline}</CardContent>
                              <CardFooter className="flex justify-between"></CardFooter>
                            </Card>
                            <Card className="w-full mt-5">
                              <CardHeader>
                                <CardTitle>Team Size</CardTitle>
                                <CardDescription>
                                  How many members are in the team?
                                </CardDescription>
                              </CardHeader>
                              <CardContent>{info.teamSize}</CardContent>
                              <CardFooter className="flex justify-between"></CardFooter>
                            </Card>
                            <Card className="w-full mt-5">
                              <CardHeader>
                                <CardTitle>Complex Features</CardTitle>
                                <CardDescription>
                                  Does your system involve unfamiliar concepts
                                  and features (e.g. Aritifical Intelligence)?
                                </CardDescription>
                              </CardHeader>
                              <CardContent>{info.complexFeatures}</CardContent>
                            </Card>

                            {/*  */}
                            <Card className="w-full mt-5">
                              <CardHeader>
                                <CardTitle>Client Involvement</CardTitle>
                                <CardDescription>
                                  How often does the client check the
                                  development progress?
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                {info.clientInvolvement}
                              </CardContent>
                              <CardFooter className="flex justify-between"></CardFooter>
                            </Card>
                            <Card className="w-full mt-5">
                              <CardHeader>
                                <CardTitle>
                                  Scope and Requirements Stability
                                </CardTitle>
                                <CardDescription>
                                  How fixed are the scopes and requirements that
                                  was planned in the preparation phase?
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                {info.scopeAndRequirements}
                              </CardContent>
                              <CardFooter className="flex justify-between"></CardFooter>
                            </Card>
                            <Card className="w-full mt-5">
                              <CardHeader>
                                <CardTitle>Resource Availability</CardTitle>
                                <CardDescription>
                                  Are the resources sufficient for development?
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                {info.resourceAvailability}
                              </CardContent>
                              <CardFooter className="flex justify-between"></CardFooter>
                            </Card>
                            <Card className="w-full mt-5">
                              <CardHeader>
                                <CardTitle>
                                  Quality Assurance and Testing
                                </CardTitle>
                                <CardDescription>
                                  How often are the system tested?
                                </CardDescription>
                              </CardHeader>
                              <CardContent>{info.qualityAssurance}</CardContent>
                              <CardFooter className="flex justify-between"></CardFooter>
                            </Card>
                            <Card className="w-full mt-5">
                              <CardHeader>
                                <CardTitle>Deployment</CardTitle>
                                <CardDescription>
                                  How will the system be developed?
                                </CardDescription>
                              </CardHeader>
                              <CardContent>{info.deployment}</CardContent>
                              <CardFooter className="flex justify-between"></CardFooter>
                            </Card>

                            <DialogFooter>
                              <Button>Close</Button>
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
                  <Button type="submit">Proceed</Button>
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
