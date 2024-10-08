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

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart";

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

interface TaskPerMonthCardProps {
    projectId: string;
}
  
export const TaskPerMonthCard = ({
    projectId,
}: TaskPerMonthCardProps) => {
    
    return(
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
        </>
    )
}