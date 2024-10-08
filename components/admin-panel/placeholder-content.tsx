"use client";

import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { PiArrowsLeftRightThin } from "react-icons/pi";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Workspace {
  workspace: {
    id: string;
    name: string;
    sdlc: string | null;
  };
}

interface ProjectByTasks {
  project: Workspace[];
}

const sdlcColors = [
  {
    sdlc: "waterfall",
    block: <div className="flex p-1 bg-blue-400" />,
  },
  {
    sdlc: "scrum",
    block: <div className="flex p-1 bg-amber-400" />,
  },
  {
    sdlc: "kanban",
    block: <div className="flex p-1 bg-cyan-400" />,
  },
  {
    sdlc: "devops",
    block: <div className="flex p-1 bg-fuchsia-400" />,
  },
  {
    sdlc: "v-shape",
    block: <div className="flex p-1 bg-pink-400" />,
  },
  {
    sdlc: "spiral",
    block: <div className="flex p-1 bg-rose-400" />,
  },
  {
    sdlc: "rad",
    block: <div className="flex p-1 bg-teal-400" />,
  },
  {
    sdlc: "lean",
    block: <div className="flex p-1 bg-red-400" />,
  },
  {
    sdlc: "iterative",
    block: <div className="flex p-1 bg-lime-400" />,
  },
];

const PlaceholderContent = ({ project }: ProjectByTasks) => {
  const user = useCurrentUser();

  const router = useRouter();

  return (
    <div className="w-full p-5">
      <div className="w-full">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={`${user?.image}`} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-2xl">{user?.name}</p>
            <p className="text-gray-500">Welcome to iTaskDev Home Page</p>
          </div>
        </div>
        <Separator className="my-5" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle>Projects</CardTitle>
                <CardDescription>
                  Projects with nearest deadlines
                </CardDescription>
              </div>
              <Button variant={"ghost"} className="flex items-center text-sm">
                <Link href="/projects">View all</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {project.map((proj, index) => (
              <button
                onClick={() => router.push(`/projects/${proj.workspace.id}`)}
                className="w-full"
              >
                <Card className="mb-5 mr-5 hover:bg-zinc-100 flex" key={index}>
                  <div className="flex">
                    {sdlcColors.map((color, index) => {
                      if (color.sdlc === proj.workspace.sdlc) {
                        return <>{color.block}</>;
                      }
                      return null;
                    })}
                    <div>
                      <CardHeader>
                        <CardTitle className="flex justify-between items-center text-lg">
                          {proj.workspace.name}
                        </CardTitle>
                      </CardHeader>
                    </div>
                  </div>
                </Card>
              </button>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Latest updates in iTaskDev</CardDescription>
              </div>
              <div className="flex items-center text-sm">View all</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div className="text-sm mr-8">
                Implementation of DevIntel AI an SDLC Recommendation feature to
                find the best Methodology for your project powered by NLP.
              </div>
              <div className="flex text-sm text-gray-500">September 23</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle>Tasks</CardTitle>
                <CardDescription>
                  Manage subscriptions and billing
                </CardDescription>
              </div>
              <div className="flex items-center text-sm">Manage</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-start text-sm space-y-10">
              <button className="mt-5">Manage subscriptions</button>
              <button>Payment accounts</button>
              <button>Get more services</button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle>Discover</CardTitle>
                <CardDescription>Get the most out of iTaskDev</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Image
              src="/transhumans/experiments.png"
              alt="expe"
              width={500}
              height={500}
              className="w-56 h-full mx-auto"
            />
            <p className="text-sm my-5">Get the most out of iTaskDev</p>
            <p className="text-sm my-5 text-gray-500">
              Learn more about the best features of iTaskDev and make sure
              everything is set up just right.
            </p>
            <button>DISCOVER ITASKDEV</button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle>Github</CardTitle>
                <CardDescription>Manage your domains</CardDescription>
              </div>
              <div className="flex items-center text-sm">Overview</div>
            </div>
          </CardHeader>
          <CardContent></CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <div className="mr-5">
                <CardTitle>Security</CardTitle>
                <CardDescription>
                  View notifications about potential issues
                </CardDescription>
              </div>
              <div className="flex items-center text-sm">View all</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <PiArrowsLeftRightThin /> Primary admin changed
              </div>
              <div className="text-gray-500 text-sm">September 23</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlaceholderContent;
