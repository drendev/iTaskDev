"use client";

import { Tasks } from "@/types";
import {
    format,
    getDay,
    parse,
    startOfWeek,
    addMonths,
    subMonths,
    isSameDay,
} from "date-fns"
import { enUS } from "date-fns/locale";
import { useState } from "react";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";

import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./data-calendar.css"
import { EventCard } from "./event-card";
import { Button } from "../ui/button";
import { 
    CalendarIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
 } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/app/(invite)/(routes)/pending/_components/user-avatar";

const locales = {
    "en-US": enUS
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

interface DataCalendarProps {
    data: Tasks[];
};

interface CustomToolbarProps {
    date: Date;
    onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void;
}

const CustomToolbar = ({ date, onNavigate, disablePrev }: CustomToolbarProps & { disablePrev: boolean }) => {
    return (
        <div className="flex mb-4 gap-x-2 items-center w-full lg:w-auto justify-between">
            <div className="flex gap-x-2 items-center w-full">
            <Button
                onClick={() => onNavigate("PREV")}
                variant="secondary"
                size="icon"
                disabled={disablePrev}
            >
                <ChevronLeftIcon className="size-4" />
            </Button>
            <div className="flex items-center border border-input rounded-md px-3 py-2 h-8 justify-center w-full lg:w-auto">
                <CalendarIcon className="size-4 mr-2" />
                <p className="text-sm">
                    {format(date, "MMMM yyyy")}
                </p>
            </div>
            <Button
                onClick={() => onNavigate("NEXT")}
                variant="secondary"
                size="icon"
            >
                <ChevronRightIcon className="size-4" />
            </Button>
            </div>
        </div>
    );
};

export const DataCalendar = ({
    data,
}: DataCalendarProps) => {
    const [value, setValue] = useState(
        data.length > 0 && data[0].DateDue ? new Date(data[0].DateDue) : new Date()
    );
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showModal, setShowModal] = useState(false)

    const intensityColorMap: Record<string, string> = {
        Hard: "border-l-red-500",
        Medium: "border-l-yellow-500",
        Easy: "border-l-green-500",
    }

    const events = data.reduce((acc, task) => {
        const taskDate = task.DateDue ? new Date(task.DateDue) : new Date();
        const dateKey = taskDate.toDateString();

        if (!acc[dateKey]) {
            acc[dateKey] = {
                start: taskDate,
                end: taskDate,
                task: task.content,
                id: task.id,
                assignee: task.members.map(member => member.member.user),
                intensity: task.Intensity,
                status: task.Status,
            };
        }

        return acc;
    }, {} as Record<string, any>); 

    const eventsArray = Object.values(events);

    const earliestTaskDate = data.length > 0 && data[0].DateDue ? new Date(data[0].DateDue) : new Date()

    const handleNavigate = (action: "PREV" | "NEXT" | "TODAY") => {
        if (action === "PREV") {
            setValue(subMonths(value, 1));
        } else if (action === "NEXT") {
            setValue(addMonths(value, 1));
        } else if (action === "TODAY") {
            setValue(new Date());
        }
    };

    const disablePrev = value <= new Date(earliestTaskDate.getFullYear(), earliestTaskDate.getMonth() +1, 1);

    const handleTaskClick = (date: Date) => {
        setSelectedDate(date);
        setShowModal(true);
    };

    const tasksForSelectedDate = selectedDate
        ? data.filter(task => task.DateDue && isSameDay(new Date(task.DateDue), selectedDate))
        : [];

    return (
        <>
        <Calendar
        localizer={localizer}
        date={value}
        events={eventsArray}
        components={{
            eventWrapper: ({ event }) => {
                const tasksForEvent = data.filter(task => task.DateDue && isSameDay(new Date(task.DateDue), event.start));
                const taskCount = tasksForEvent.length;

                return (
                    <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                onClick={() => handleTaskClick(event.start)}
                                className="relative cursor-pointer min-h-[70px]"
                            >
                                <EventCard
                                    id={event.id}
                                    title={event.task}
                                    assignee={event.assignee}
                                    status={event.status || ""}
                                    intensity={event.intensity || ""}
                                />
                                {taskCount > 1 && (
                                    <Badge
                                        variant="default"
                                        className="absolute top-[-1px] right-1 text-[0.6rem]"
                                    >
                                        + {taskCount - 1}
                                    </Badge>
                                )}
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                            <p className="font-semibold text-sm capitalize">
                                View tasks due on {format(event.start, "PPP")}
                            </p>          
                        </TooltipContent>
                    </Tooltip>
                    </TooltipProvider>
                );
            },
            toolbar: () => (
                <CustomToolbar date={value} onNavigate={handleNavigate} disablePrev={disablePrev} />
            )
        }}
        views={["month"]}
        defaultView="month"
        toolbar
        showAllEvents
        className="h-full"
        max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
        formats={{
            weekdayFormat: (date, culture, localizer) => localizer?.format(date, "EEE", culture) ?? ""
        }}
        />

        {showModal && (
            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tasks due on {selectedDate ? format(selectedDate, "PPP") : ""}</DialogTitle>
                        <DialogDescription>
                            {tasksForSelectedDate.length > 0 ? (
                                <>
                                    {tasksForSelectedDate.map(task => (
                                        <div key={task.id} className={cn(
                                            "p-1.5 text-xs bg-slate-50 text-zinc-700 mb-3 border rounded-md !border-l-4 flex flex-col gap-y-1.5 transition",
                                            intensityColorMap[task.Intensity || ""] || "" )}>
                                                <div className="flex justify-start font-bold text-slate-600 mb-3">
                                                    {task.content}
                                                </div>
                                                <div className="flex justify-between">
                                                    <div className="text-left">
                                                        <p><span className="font-semibold">Status:</span> {task.Status}</p>
                                                        <p><span className="font-semibold">Intensity:</span> {task.Intensity}</p>
                                                    </div>
                                                    <div className="">
                                                        {task.members.map((member: any) => (
                                                            <div key={member.id} className="flex items-center gap-x-2 mb-1">
                                                            <UserAvatar
                                                                key={member.id}
                                                                src={member.member.user.image}
                                                                className="w-6 h-6"
                                                            />
                                                            <div className="flex flex-col gap-y-1">
                                                                <div className="text-xs flex items-center">
                                                                    {member.member.user.name}
                                                                </div>
                                                            </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <p>No tasks due on this date.</p>
                            )}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        )}
        </>
    )
}