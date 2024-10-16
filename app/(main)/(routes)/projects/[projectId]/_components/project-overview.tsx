"use client";

import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

import { Label, Pie, PieChart } from "recharts";

interface ChartStatistics {
  pendingTotal: number;
  doneTotal: number;
  progressPercentage: number;
  totalTasks: number;
}

interface ProjectOverviewCardProps {
  projectId: string;
  tasks: ChartStatistics;
}

export const ProjectOverviewCard = ({
  projectId,
  tasks,
}: ProjectOverviewCardProps) => {
  // Project Overview

  const radialChartConfig = {
    visitors: {
      label: "Visitors",
    },
    progress: {
      label: "Progress",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const chartData = [
    {
      status: "pending",
      tasks: tasks.pendingTotal,
      fill: "var(--color-pending)",
    },
    {
      status: "completed",
      tasks: tasks.doneTotal,
      fill: "var(--color-completed)",
    },
  ];

  const chartConfig = {
    tasks: {
      label: "Tasks",
    },
    pending: {
      label: "Pending",
      color: "hsl(var(--chart-3))",
    },
    completed: {
      label: "Completed",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  // Progress Chart

  const progressPercentage = parseFloat(tasks.progressPercentage.toFixed(2));

  const radialChartData = [
    {
      progress: "Progress",
      visitors: progressPercentage, // Use percentage for progress
      fill: "var(--color-progress)",
    },
  ];

  return (
    <>
      <Card className="">
        <CardHeader>
          <CardTitle>Tasks Overview</CardTitle>
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
                            {tasks.totalTasks}
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
          <ChartContainer
            config={radialChartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <RadialBarChart
              data={radialChartData}
              startAngle={90} // Start at the top (12 o'clock)
              endAngle={90 + (progressPercentage / 100) * 360} // Dynamically set end angle based on progress
              innerRadius={80}
              outerRadius={110}
            >
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
                className="first:fill-muted last:fill-background"
                polarRadius={[86, 74]}
              />
              <RadialBar
                dataKey="visitors"
                background
                cornerRadius={10}
                fill="var(--color-progress)" // Use your custom color
              />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                            className="fill-foreground text-4xl font-bold"
                          >
                            {progressPercentage}%
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Progress
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </>
  );
};
