"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RecentCommitsCardProps {
  projectId: string;
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

import { useTasksQuery } from "@/hooks/use-tasks-query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Loader2 } from "lucide-react";
import { ProjectOverviewCard } from "./project-overview";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { TasksIntensity } from "../tasks/(createtask)/taskintensity/_components/render-tasks-intensity";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export const ProjectTasksCard = ({ projectId }: RecentCommitsCardProps) => {
  const { data, status } = useTasksQuery({
    queryKey: `tasks:${projectId}`,
    projectId: projectId,
  });

  const user = useCurrentUser();

  if (status === "pending") {
    return (
      <>
        <Card className="row-span-2">
          <CardHeader>
            <CardTitle>Project Tasks</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-full">
            <Loader2 className="mr-2 h-8 w-8 animate-spin" />
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader>
            <CardTitle>Projects Overview</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[250px]">
            <Loader2 className="mr-2 h-8 w-8 animate-spin" />
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[250px]">
            <Loader2 className="mr-2 h-8 w-8 animate-spin" />
          </CardContent>
        </Card>
      </>
    );
  }

  if (status === "error") {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Failed to load tasks</p>
      </div>
    );
  }

  const pendingTasks = data.tasks
    .filter((task: any) => task.Status === "Pending")
    .map((task: any) => {
      return {
        taskContent: task.content,
        taskIntensity: task.Intensity,
        taskDateDue: task.DateDue,
        taskMembers: task.members.map((member: any) => {
          return {
            memberId: member.member.user.id,
            memberUsername: member.member.user.name,
            memberImage: member.member.user.image,
          };
        }),
      };
    });

  const userTasks = pendingTasks.filter((task: any) =>
    task.taskMembers.some((member: any) => member.memberId === user?.id)
  );

  const chartTasksStats = {
    pendingTotal: pendingTasks.length,
    doneTotal: data.tasks.length - pendingTasks.length,
    progressPercentage:
      ((data.tasks.length - pendingTasks.length) / data.tasks.length) * 100,
    totalTasks: data.tasks.length,
  };

  return (
    <>
      <Card className="row-span-2">
        <CardHeader>
          <CardTitle>Project Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="projecttasks">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="projecttasks">Project Tasks</TabsTrigger>
              <TabsTrigger value="mytasks">My Tasks</TabsTrigger>
            </TabsList>

            {/* Upcoming Tasks */}
            <TabsContent value="projecttasks" className="space-y-5">
              {pendingTasks.length > 0 ? (
                pendingTasks.slice(0, 5).map((task: any, index: number) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg flex items-center gap-3">
                          {task.taskMembers.map((member: any) => (
                            <TooltipProvider key={member.id}>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Avatar>
                                    <AvatarImage
                                      src={member.memberImage}
                                    ></AvatarImage>
                                  </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {member.memberUsername}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ))}

                          <Badge>{task.taskIntensity}</Badge>
                        </CardTitle>
                      </div>
                      <CardDescription>{task.taskContent}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2"></CardContent>
                  </Card>
                ))
              ) : (
                <div>
                  <div>
                    <Image
                      src={"/transhumans/waiting.png"}
                      alt="No tasks"
                      width={300}
                      height={300}
                    />
                    <p className="flex justify-center">No tasks right now</p>
                    <div className="flex justify-center mt-3">
                      <Link href={`/projects/${projectId}/tasks/taskcontent`}>
                        <Button className="flex items-center gap-3">
                          Add Tasks <Plus size={20} />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
            <TabsContent value="mytasks" className="space-y-5">
              {userTasks.length > 0 ? (
                userTasks.slice(0, 5).map((task: any, index: number) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg flex items-center gap-3">
                          {task.taskMembers.map((member: any) => (
                            <TooltipProvider key={member.id}>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Avatar>
                                    <AvatarImage
                                      src={member.memberImage}
                                    ></AvatarImage>
                                  </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {member.memberUsername}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ))}

                          <Badge>{task.taskIntensity}</Badge>
                        </CardTitle>
                      </div>
                      <CardDescription>{task.taskContent}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2"></CardContent>
                  </Card>
                ))
              ) : (
                <div>
                  <div>
                    <Image
                      src={"/transhumans/waiting.png"}
                      alt="No tasks"
                      width={300}
                      height={300}
                    />
                    <p className="flex justify-center">No tasks right now</p>
                    <div className="flex justify-center mt-3">
                      <Link href={`/projects/${projectId}/tasks/taskcontent`}>
                        <Button className="flex items-center gap-3">
                          Add Tasks <Plus size={20} />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
      <ProjectOverviewCard projectId={projectId} tasks={chartTasksStats} />
    </>
  );
};
