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

interface RenderSdlcProps {
  sdlc: string;
  info: ProjectSdlc;
}

const sdlcTemp = [
  {
    sdlc: "waterfall",
    color: "#60a5fa",
    img: "/sdlc/waterfall.png",
  },
  {
    sdlc: "scrum",
    color: "#fbbf24",
    img: "/sdlc/scrum.png",
  },
  {
    sdlc: "kanban",
    color: "#22d3ee",
    img: "/sdlc/kanban.png",
  },
  {
    sdlc: "spiral",
    color: "text-rose-500",
    img: "/sdlc/spiral.png",
  },
  {
    sdlc: "v-shape",
    color: "#f472b6",
    img: "/sdlc/vshape.png",
  },
  {
    sdlc: "lean",
    color: "#f87171",
    img: "/sdlc/lean.png",
  },
  {
    sdlc: "devops",
    color: "#e879f9",
    img: "/sdlc/devops.png",
  },
  {
    sdlc: "iterative",
    color: "#a3e635",
    img: "/sdlc/iterative.png",
  },
  {
    sdlc: "rad",
    color: "#2dd4bf",
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
              <Card className="w-full mt-5">
                <CardHeader>
                  <CardTitle>Get your SDLC</CardTitle>
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
                          Carefully analyzed and compared with the power of NLP
                        </CardDescription>
                      </CardHeader>
                      <CardContent>{info.timeline}</CardContent>
                      <CardFooter className="flex justify-between"></CardFooter>
                    </Card>
                    <Card className="w-full mt-5">
                      <CardHeader>
                        <CardTitle>Team Size</CardTitle>
                        <CardDescription>
                          Carefully analyzed and compared with the power of NLP
                        </CardDescription>
                      </CardHeader>
                      <CardContent>{info.teamSize}</CardContent>
                      <CardFooter className="flex justify-between"></CardFooter>
                    </Card>
                    <Card className="w-full mt-5">
                      <CardHeader>
                        <CardTitle>Complex Features</CardTitle>
                        <CardDescription>
                          Carefully analyzed and compared with the power of NLP
                        </CardDescription>
                      </CardHeader>
                      <CardContent>{info.complexFeatures}</CardContent>
                      <CardFooter className="flex justify-between"></CardFooter>
                    </Card>
                    <Card className="w-full mt-5">
                      <CardHeader>
                        <CardTitle>Client Involvement</CardTitle>
                        <CardDescription>
                          Carefully analyzed and compared with the power of NLP
                        </CardDescription>
                      </CardHeader>
                      <CardContent>{info.clientInvolvement}</CardContent>
                      <CardFooter className="flex justify-between"></CardFooter>
                    </Card>
                    <Card className="w-full mt-5">
                      <CardHeader>
                        <CardTitle>Scope and Requirements Stability</CardTitle>
                        <CardDescription>
                          Carefully analyzed and compared with the power of NLP
                        </CardDescription>
                      </CardHeader>
                      <CardContent>{info.scopeAndRequirements}</CardContent>
                      <CardFooter className="flex justify-between"></CardFooter>
                    </Card>
                    <Card className="w-full mt-5">
                      <CardHeader>
                        <CardTitle>Resource Availability</CardTitle>
                        <CardDescription>
                          Carefully analyzed and compared with the power of NLP
                        </CardDescription>
                      </CardHeader>
                      <CardContent>{info.resourceAvailability}</CardContent>
                      <CardFooter className="flex justify-between"></CardFooter>
                    </Card>
                    <Card className="w-full mt-5">
                      <CardHeader>
                        <CardTitle>Quality Assurance</CardTitle>
                        <CardDescription>
                          Carefully analyzed and compared with the power of NLP
                        </CardDescription>
                      </CardHeader>
                      <CardContent>{info.qualityAssurance}</CardContent>
                      <CardFooter className="flex justify-between"></CardFooter>
                    </Card>
                    <Card className="w-full mt-5">
                      <CardHeader>
                        <CardTitle>Deployment</CardTitle>
                        <CardDescription>
                          Carefully analyzed and compared with the power of NLP
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
