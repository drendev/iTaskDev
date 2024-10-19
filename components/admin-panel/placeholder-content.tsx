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
import { Task } from "@prisma/client";
import { Badge } from "../ui/badge";
import { CircleCheck } from "lucide-react";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Progress } from "../ui/progress";

interface Workspace {
  dueDate: Date | null;
  workspace: {
    id: string;
    name: string;
    sdlc: string | null;
  };
}

interface Tasks {
  taskContent: string;
  taskDateCompleted: Date | null;
  taskStatus: string | null;
  projectName: string;
  projectSDLC: string | null;
}

interface ProjectProgressTasks {
  status: string | null;
}

interface ProjectProgress {
  projectName: string;
  projectSDLC: string | null;
  taskStatus: ProjectProgressTasks[];
}

interface ProjectByTasks {
  project: Workspace[];
  tasks: Tasks[];
  progress: ProjectProgress[];
}

const sdlcData: { sdlc: string; color: string }[] = [
  { sdlc: "waterfall", color: "bg-blue-400" },
  { sdlc: "scrum", color: "bg-amber-400" },
  { sdlc: "kanban", color: "bg-cyan-400" },
  { sdlc: "devops", color: "bg-fuchsia-400" },
  { sdlc: "v-shape", color: "bg-pink-400" },
  { sdlc: "spiral", color: "bg-rose-400" },
  { sdlc: "rad", color: "bg-teal-400" },
  { sdlc: "lean", color: "bg-red-400" },
  { sdlc: "iterative", color: "bg-lime-400" },
];

const SdlcBlock = ({ color }: { color: string }) => (
  <div className={`flex p-1 ${color}`} />
);

const PlaceholderContent = ({ project, tasks, progress }: ProjectByTasks) => {
  const user = useCurrentUser();

  const router = useRouter();

  // Recently Done Tasks
  const doneTasks = tasks.filter((task) => task.taskStatus === "Done");

  //  Tasks done per month
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const barChartStats = months.reduce((acc, month, index) => {
    acc[month] = tasks.filter((task: any) => {
      const dateCompleted = task.taskDateCompleted
        ? new Date(task.taskDateCompleted)
        : null;
      return (
        dateCompleted instanceof Date &&
        !isNaN(dateCompleted.getTime()) &&
        dateCompleted.getMonth() + 1 === index + 1
      );
    }).length;
    return acc;
  }, {} as Record<string, number>);

  const chartData = [
    { month: "January", tasks: barChartStats.January },
    { month: "February", tasks: barChartStats.February },
    { month: "March", tasks: barChartStats.March },
    { month: "April", tasks: barChartStats.April },
    { month: "May", tasks: barChartStats.May },
    { month: "June", tasks: barChartStats.June },
    { month: "July", tasks: barChartStats.July },
    { month: "August", tasks: barChartStats.August },
    { month: "September", tasks: barChartStats.September },
    { month: "October", tasks: barChartStats.October },
    { month: "November", tasks: barChartStats.November },
    { month: "December", tasks: barChartStats.December },
  ];
  const chartConfig = {
    tasks: {
      label: "Tasks",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  // Projects with most progress

  const progressCalculate = progress.map((project) => {
    return {
      projectName: project.projectName,
      projectSDLC: project.projectSDLC,
      progress: parseFloat(
        (
          (project.taskStatus.filter((task) => task.status === "Done").length /
            project.taskStatus.length) *
          100
        ).toFixed(2)
      ),
    };
  });

  const compare = (a: any, b: any) => {
    if (a.progress > b.progress) {
      return -1;
    }
    if (a.progress < b.progress) {
      return 1;
    }
    return 0;
  };

  progressCalculate.sort(compare);

  console.log("ProgressCalculate: ", progressCalculate);

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
      <div className="grid grid-cols-6 gap-3">
        <Card className="col-span-4">
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
            {project.length > 0 ? (
              project.map((proj, index) => (
                <button
                  onClick={() => router.push(`/projects/${proj.workspace.id}`)}
                  className="w-full"
                >
                  <Card
                    className="mb-5 mr-5 hover:bg-zinc-100 flex shadow-md"
                    key={index}
                  >
                    <div className="flex">
                      {sdlcData.map((color, index) => {
                        if (color.sdlc === proj.workspace.sdlc) {
                          return (
                            <>
                              <SdlcBlock color={color.color} />
                            </>
                          );
                        }
                        return null;
                      })}
                      <div>
                        <CardHeader>
                          <p className="flex font-semibold text-lg">
                            {proj.workspace.name}
                          </p>
                          <p className="flex">
                            {" "}
                            {proj.dueDate
                              ? proj.dueDate.toDateString()
                              : "On-Going"}
                          </p>
                        </CardHeader>
                      </div>
                    </div>
                  </Card>
                </button>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center mx-auto">
                <Image
                  src="/transhumans/roboto.png"
                  alt="No projects"
                  height={300}
                  width={300}
                />
                <div>
                  Create your first project or Join a project with an invitation
                  link
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Completed Tasks</CardTitle>
            <CardDescription>Your recent tasks marked as done</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 overflow-y-scroll">
            {doneTasks.length > 0 ? (
              doneTasks.slice(0, 3).map((task) => (
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="text-base mb-2">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-emerald-500">Done</Badge>
                        <p>{task.taskContent}</p>
                      </div>
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {`Completed:  ${task.taskDateCompleted?.toDateString()}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex gap-3">
                    {sdlcData.map((color, index) => {
                      if (color.sdlc === task.projectSDLC) {
                        return <SdlcBlock color={color.color} />;
                      }
                      return null;
                    })}
                    <p className="text-xs">{task.projectName}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center mx-auto">
                <Image
                  src="/transhumans/puppy.png"
                  alt="No projects"
                  height={200}
                  width={200}
                />
                <div className="text-center">
                  Create your first project or Join a project with an invitation
                  link
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Tasks done per month</CardTitle>
            <CardDescription>
              Showing tasks done per month for the whole year
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" hideLabel />}
                />
                <Area
                  dataKey="tasks"
                  type="linear"
                  fill="var(--color-tasks)"
                  fillOpacity={0.4}
                  stroke="var(--color-tasks)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
            <CardDescription>Projects that are almost done</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {progressCalculate.length > 0 ? (
              progressCalculate.slice(0, 5).map((project) => (
                <div>
                  <div className="flex items-center gap-3">
                    <p className="w-56">{project.projectName}</p>
                    <Progress value={project.progress} />
                    <p className="w-20">
                      {project.progress ? project.progress : "0"}%
                    </p>
                  </div>
                  <Separator className="mt-5" />
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center mx-auto">
                <Image
                  src="/transhumans/new-beginnings.png"
                  alt="No projects"
                  height={300}
                  width={300}
                />
                <div className="text-center">
                  Create your first project or Join a project with an invitation
                  link
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlaceholderContent;
