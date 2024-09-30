"use client";

import * as React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ToastHandler from "@/app/(invite)/(routes)/invite/_components/toast-handler";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label, Pie, PieChart } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Bug,
  CalendarCheck,
  Code,
  CookieIcon,
  Database,
  Globe,
  Settings,
} from "lucide-react";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

interface ProjectIdPageProps {
  params: {
    projectId: string;
  };
}

export const description = "A donut chart with text";

const chartData = [
  { status: "notstarted", tasks: 275, fill: "var(--color-notstarted)" },
  { status: "inprogress", tasks: 200, fill: "var(--color-inprogress)" },
  { status: "completed", tasks: 287, fill: "var(--color-completed)" },
];

const chartConfig = {
  tasks: {
    label: "Tasks",
  },
  notstarted: {
    label: "Not Started",
    color: "hsl(var(--chart-3))",
  },
  inprogress: {
    label: "In Progress",
    color: "hsl(var(--chart-1))",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const barChartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];
const barChartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const ProjectIdPage = ({ params }: ProjectIdPageProps) => {
  const totalTasks = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.tasks, 0);
  }, []);

  const percentage = 66;
  return (
    <div className="grid grid-cols-4 mt-6 gap-5">
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

      {/*  */}
      <Card className="">
        <CardHeader>
          <CardTitle>Projects Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="tasks"
                nameKey="status"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalTasks.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Tasks
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="status" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>

      {/*  */}
      <Card className="">
        <CardHeader>
          <CardTitle>Project Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <CircularProgressbar value={percentage} text={`${percentage}%`} />;
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>

      {/*  */}
      <Card className="row-span-2">
        <CardHeader>
          <CardTitle>My Meetings</CardTitle>
        </CardHeader>
        <CardContent>
          
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>

      {/*  */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Tasks done per month</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={barChartConfig}>
            <BarChart
              accessibilityLayer
              data={barChartData}
              layout="vertical"
              margin={{
                left: -20,
              }}
            >
              <XAxis type="number" dataKey="desktop" hide />
              <YAxis
                dataKey="month"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default ProjectIdPage;
