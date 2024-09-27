"use client";

import { Input } from "@/components/ui/input";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormDescription,
    FormMessage,
    FormLabel
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Calendar } from "@/components/ui/calendar";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GoX, GoXCircle, GoXCircleFill } from "react-icons/go";
import { complex } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";

interface ProjectInformationPageProps {
    params: {
        projectId: string;
    }
}

const formSchema = z.object({
    tasks: z.number().min(1, "Minimum of 1 task").max(100, "Maximum of 100 tasks"),
    description: z.string().min(12, "Minimum of 12 characters"),
    dueDate: z.date().min(new Date(), "Due date must be in the future"),
    complexFeatures: z.boolean(),
    clientInvolvement: z.boolean(),
    deployment: z.boolean(),
    testing: z.string().min(1, "testing is required"),
    members: z.string().min(1, "Members cannot be empty")
  });

const ProjectInformationPage = ({
    params
}: ProjectInformationPageProps) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          tasks: 1,
          description: "",
          dueDate: new Date(),
          complexFeatures: false,
          clientInvolvement: false,
          deployment: false,
          testing: "low",
          members: "2-3 members"
        },
      });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
        const response = await axios.post(
        `/api/workspaces/${params.projectId}/create/information`,{
            tasks: values.tasks,
            description: values.description,
            dueDate: values.dueDate, 
            complexFeatures: values.complexFeatures, 
            clientInvolvement: values.clientInvolvement, 
            deployment: values.deployment, 
            testing: values.testing, 
            members: values.members 
        }
        );
        
        form.reset();
        router.push(`/projects/${params.projectId}/create/information/manage`);
    } catch (error) {
        console.log(error);
    }
    };


    return (
        <div className="m-4">
            <Form {...form}>
                <form className="max-w-[350px] space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField 
                    control={form.control}
                    name="tasks"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel> Number of Tasks</FormLabel>
                            <FormControl>
                                <Input
                                disabled={false}
                                placeholder="Number of Tasks"
                                type="number"
                                {...field}
                                min={1}
                                onChange={(e) => {
                                    const value = e.target.value ? Number(e.target.value) : '';
                                    field.onChange(value);
                                }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField 
                    control={form.control}
                    name="description"
                    render={({ field}) => (
                        <FormItem>
                            <FormLabel> Project Description</FormLabel>
                            <FormControl>
                                <Textarea 
                                disabled={false}
                                placeholder="Project Description"
                                {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                    />

                    <FormField 
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Project Due Date</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                )}
                                >
                                {field.value ? (
                                    format(field.value, "PPP")
                                ) : (
                                    <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                    date < new Date() || date > new Date("2027-01-01")
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <FormDescription className="text-xs">
                            Project expected to be done
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField 
                    control={form.control}
                    name="complexFeatures"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Does your project have complex features?</FormLabel>
                            <FormControl>
                                <Select onValueChange={(value) => field.onChange(value === "true")}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="None" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectItem value="false">None</SelectItem>
                                    <SelectItem value="true">Yes</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                    />

                    <FormField 
                    control={form.control}
                    name="clientInvolvement"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Does your project include client involvement?</FormLabel>
                            <FormControl>
                                <Select onValueChange={(value) => field.onChange(value === "true")}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="None" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectItem value="false">None</SelectItem>
                                    <SelectItem value="true">Yes</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                    />

                    <FormField 
                    control={form.control}
                    name="deployment"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Does your project need to be deployed?</FormLabel>
                            <FormControl>
                                <Select onValueChange={(value) => field.onChange(value === "true")}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="No" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectItem value="false">No</SelectItem>
                                    <SelectItem value="true">Yes</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                    />

                    <FormField 
                    control={form.control}
                    name="testing"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Approximate testing time for the project:</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue defaultValue="low" placeholder="Low" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="moderate">Moderate</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                    />

                    <FormField 
                    control={form.control}
                    name="members"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>How many members will your project have?</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="2-3 Members" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectItem value="2-3 members">2 - 3 members</SelectItem>
                                    <SelectItem value="4-5 members">4 - 5 members</SelectItem>
                                    <SelectItem value="6-7 members">6 - 7 members</SelectItem>
                                    <SelectItem value="8-9 members">8 - 9 members</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                    />

                    <Button type="submit">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default ProjectInformationPage;