
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

import {
    Bug,
    CalendarCheck,
    Code,
    CookieIcon,
    Database,
    Globe,
} from "lucide-react";

export const ProjectTasksCard = ({
    projectId,
}: RecentCommitsCardProps) => {
    return (
        <>
            <Card className="row-span-2">
            <CardHeader>
            <CardTitle>My Tasks</CardTitle>
            </CardHeader>
            <CardContent>
            <Tabs defaultValue="account">
                <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Today</TabsTrigger>
                <TabsTrigger value="password">Tomorrow</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="space-y-5">
                <Card>
                    <CardHeader>
                    <Code size={30} />
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">
                        Sign-In page Front-end
                        </CardTitle>
                        <Checkbox />
                    </div>
                    <CardDescription>
                        Implement the authentication page design using tailwind CSS.
                    </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2"></CardContent>
                </Card>
                <Card>
                    <CardHeader>
                    <Bug size={30} />
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">
                        Debug landing page
                        </CardTitle>
                        <Checkbox />
                    </div>
                    <CardDescription>
                        There are a few errors concerning the landing page.
                    </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2"></CardContent>
                </Card>
                <Card>
                    <CardHeader>
                    <CalendarCheck size={30} />
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">
                        Calendar UI Design
                        </CardTitle>
                        <Checkbox />
                    </div>
                    <CardDescription>
                        Design the calendar ui for task timeline organization
                    </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2"></CardContent>
                </Card>
                </TabsContent>

                {/*  */}
                <TabsContent value="password">
                <Card>
                    <CardHeader>
                    <Database size={30} />
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">
                        Implement PostgreSQL
                        </CardTitle>
                        <Checkbox />
                    </div>
                    <CardDescription>
                        Create the relational database for the back-end.
                    </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2"></CardContent>
                </Card>
                <Card>
                    <CardHeader>
                    <CookieIcon size={30} />
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">
                        Handle cookie management
                        </CardTitle>
                        <Checkbox />
                    </div>
                    <CardDescription>
                        Implement how the system handle user-data
                    </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2"></CardContent>
                </Card>
                <Card>
                    <CardHeader>
                    <Globe size={30} />
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">SEO</CardTitle>
                        <Checkbox />
                    </div>
                    <CardDescription>
                        Improve search engine optimization
                    </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2"></CardContent>
                </Card>
                </TabsContent>
            </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between"></CardFooter>
        </Card>
        </>
    )
}