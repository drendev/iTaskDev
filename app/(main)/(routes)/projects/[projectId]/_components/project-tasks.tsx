"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface RecentCommitsCardProps {
    projectId: string;
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

import { useTasksQuery } from "@/hooks/use-tasks-query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Loader2 } from "lucide-react";
import { ProjectOverviewCard } from "./project-overview";

export const ProjectTasksCard = ({
    projectId,
}: RecentCommitsCardProps) => {
    const { data, status } = useTasksQuery({
        queryKey: `tasks:${projectId}`,
        projectId: projectId
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
                <Loader2 className="mr-2 h-8 w-8 animate-spin"/>
                </CardContent>
            </Card>
            <Card className="">
                <CardHeader>
                <CardTitle>Projects Overview</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-[250px]">
                <Loader2 className="mr-2 h-8 w-8 animate-spin"/>
                </CardContent>
            </Card>
            <Card className="">
                <CardHeader>
                    <CardTitle>Project Progress</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-[250px]">
                <Loader2 className="mr-2 h-8 w-8 animate-spin"/>
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

    return (
        <>
            <Card className="row-span-2">
                <CardHeader>
                    <CardTitle>Project Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="upcoming">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                            <TabsTrigger value="my-tasks">My Tasks</TabsTrigger>
                        </TabsList>

                        {/* Upcoming Tasks */}
                        <TabsContent value="upcoming" className="space-y-5">
                            {data.tasks.slice(0, 5).map((task: any) => (
                                <Card key={task.id}>
                                    <CardHeader>
                                        <div className="flex justify-between items-center">
                                            <CardTitle className="text-lg">
                                                {task.Intensity}
                                            </CardTitle>
                                            <Checkbox />
                                        </div>
                                        <CardDescription>
                                            {task.content}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2"></CardContent>
                                </Card>
                            ))}
                        </TabsContent>

                        {/* My Tasks */}
                        <TabsContent value="my-tasks" className="space-y-5">
                            {/* {data.tasks.length > 0 ? (
                            data.tasks
                                .filter((task: any) =>
                                    task.members.some((member: any) => member.memberId === user?.id)
                                )
                                .slice(0, 5)
                                .map((task: any) => (
                                    <Card key={task.id}>
                                        <CardHeader>
                                            <div className="flex justify-between items-center">
                                                <CardTitle className="text-lg">
                                                    {task.Intensity}
                                                </CardTitle>
                                            </div>
                                            <CardDescription>
                                                {task.content}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2"></CardContent>
                                    </Card>
                                ))
                            ) : (
                                <p className=" text-gray-400">No tasks assigned to you</p>
                            )} */}
                            <p className="text-gray-400 mt-10 text-center flex">No tasks assigned.</p>
                        </TabsContent>
                    </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between"></CardFooter>
            </Card>
            <ProjectOverviewCard
            projectId={projectId}
            tasks={data.tasks.length}
            />
        </>
    );
};
