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
  },
  {
    sdlc: "scrum",
    color: "text-amber-500",
    colorbg: "bg-amber-500",
    img: "/sdlc/scrum.png",
  },
  {
    sdlc: "kanban",
    color: "#text-cyan-500",
    colorbg: "bg-cyan-500",
    img: "/sdlc/kanban.png",
  },
  {
    sdlc: "spiral",
    color: "text-rose-500",
    colorbg: "bg-rose-500",
    img: "/sdlc/spiral.png",
  },
  {
    sdlc: "v-shape",
    color: "text-pink-500",
    colorbg: "bg-pink-500",
    img: "/sdlc/vshape.png",
  },
  {
    sdlc: "lean",
    color: "text-red-500",
    colorbg: "bg-red-500",
    img: "/sdlc/lean.png",
  },
  {
    sdlc: "devops",
    color: "text-fuschia-500",
    colorbg: "bg-fuschia-500",
    img: "/sdlc/devops.png",
  },
  {
    sdlc: "iterative",
    color: "text-lime-500",
    colorbg: "bg-lime-500",
    img: "/sdlc/iterative.png",
  },
  {
    sdlc: "rad",
    color: "text-teal-500",
    colorbg: "bg-teal-500",
    img: "/sdlc/rad.png",
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
              <ProgressBar progress={33.2} color={method.color} />
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
                  <div className="flex flex-col">
                    <Image
                      src={method.img}
                      alt={method.sdlc}
                      width={500}
                      height={500}
                      className="items-center justify-center mx-auto my-5"
                    />
                    <div
                      className={`semi-bold text-4xl items-center justify-center mx-auto my-5 ${method.color}`}
                    >
                      {sdlc.toUpperCase()}
                    </div>
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
                          Does your system involve unfamiliar concepts and
                          features (e.g. Aritifical Intelligence)?
                        </CardDescription>
                      </CardHeader>
                      <CardContent>{info.complexFeatures}</CardContent>
                      <CardFooter className="flex justify-between"></CardFooter>
                    </Card>
                    <Card className="w-full mt-5">
                      <CardHeader>
                        <CardTitle>Client Involvement</CardTitle>
                        <CardDescription>
                          How often does the client check the development
                          progress?
                        </CardDescription>
                      </CardHeader>
                      <CardContent>{info.clientInvolvement}</CardContent>
                      <CardFooter className="flex justify-between"></CardFooter>
                    </Card>
                    <Card className="w-full mt-5">
                      <CardHeader>
                        <CardTitle>Scope and Requirements Stability</CardTitle>
                        <CardDescription>
                          How fixed are the scopes and requirements that was
                          planned in the preparation phase?
                        </CardDescription>
                      </CardHeader>
                      <CardContent>{info.scopeAndRequirements}</CardContent>
                      <CardFooter className="flex justify-between"></CardFooter>
                    </Card>
                    <Card className="w-full mt-5">
                      <CardHeader>
                        <CardTitle>Resource Availability</CardTitle>
                        <CardDescription>
                          Are the resources sufficient for development?
                        </CardDescription>
                      </CardHeader>
                      <CardContent>{info.resourceAvailability}</CardContent>
                      <CardFooter className="flex justify-between"></CardFooter>
                    </Card>
                    <Card className="w-full mt-5">
                      <CardHeader>
                        <CardTitle>Quality Assurance and Testing</CardTitle>
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
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between"></CardFooter>
              </Card>
            </div>
          );
        }
        return null; // Return null if there's no match to avoid rendering
      })}
    </>
  );
};
