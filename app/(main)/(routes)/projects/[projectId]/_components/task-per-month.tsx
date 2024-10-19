"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import { useTasksQuery } from "@/hooks/use-tasks-query";

import { Loader2 } from "lucide-react";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

interface TaskPerMonthCardProps {
  projectId: string;
}

export const TaskPerMonthCard = ({ projectId }: TaskPerMonthCardProps) => {
  const { data, status } = useTasksQuery({
    queryKey: `tasks:${projectId}`,
    projectId: projectId,
  });

  if (status === "pending") {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Project Tasks</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-full">
          <Loader2 className="mr-2 h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

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
    acc[month] = data.tasks.filter((task: any) => {
      const dateCompleted = task.DateCompleted
        ? new Date(task.DateCompleted)
        : null;
      return (
        dateCompleted instanceof Date &&
        !isNaN(dateCompleted.getTime()) &&
        dateCompleted.getMonth() + 1 === index + 1
      );
    }).length;
    return acc;
  }, {} as Record<string, number>);

  console.log("BarChartStats", barChartStats);
  const barChartData = [
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

  const barChartConfig = {
    tasks: {
      label: "Tasks",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <>
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
              <XAxis type="number" dataKey="tasks" hide />
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
              <Bar dataKey="tasks" fill="var(--color-tasks)" radius={5} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </>
  );
};
