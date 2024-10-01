"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { format, set } from "date-fns";
import { CalendarIcon, ChevronsLeftRightEllipsis, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormDescription,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";

import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ProgressBar from "./manage/_components/progressbar";
import { useState } from "react";

interface ProjectInformationPageProps {
  params: {
    projectId: string;
  };
}

const requirements = [
  {
    id: "budget",
    label: "Budget",
  },
  {
    id: "experience",
    label: "Experienced Team",
  },
  {
    id: "tools",
    label: "Tools",
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
  },
] as const;

const formSchema = z.object({
  description: z.string().min(12, "Minimum of 12 characters"),
  dueDate: z.date().min(new Date(), "Due date must be in the future"),
  clientInvolvement: z.string().min(1, "Field is required"),
  testing: z.string().min(1, "testing is required"),
  members: z.string().min(1, "Members cannot be empty"),
  scope: z.string().min(1, "Scope cannot be empty"),
  reqs: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  maintenance: z.string().min(1, "Field is required"),
  risk: z.string().min(1, "Field is required"),
  devtools: z.string().min(12, "Minimum of 12 characters"),
});

const ProjectInformationPage = ({ params }: ProjectInformationPageProps) => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const [timeline, setTimeline] = useState("");

  const handleSelectTimeline = (value: string) => {
    setTimeline(value);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      dueDate: new Date(),
      clientInvolvement: "Weekly",
      testing: "Manual Testing",
      members: "2-3 members",
      scope: "Very Stable",
      reqs: [],
      maintenance: "Ongoing Support",
      risk: "Low",
      devtools: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `/api/workspaces/${params.projectId}/create/information`,
        {
          description: values.description,
          dueDate: values.dueDate,
          clientInvolvement: values.clientInvolvement,
          testing: values.testing,
          members: values.members,
          scope: values.scope,
          reqs: values.reqs,
          maintenance: values.maintenance,
          risk: values.risk,
          devtools: values.devtools,
        }
      );

      form.reset();
      router.push(`/projects/${params.projectId}/create/information/manage`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-4">
      <ProgressBar progress={16.6} />
      <Card>
        <CardHeader>
          <ChevronsLeftRightEllipsis size={50} />
          <CardTitle>Let&#39;s set-up your project</CardTitle>
          <CardDescription>
            Input your project information and start your software journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 space-y-5 md:grid-cols-2">
                <div className="w-full space-y-3 md:pr-10">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel> Project Description</FormLabel>
                        <FormControl>
                          <Textarea
                            disabled={loading}
                            placeholder="Project Description"
                            className="resize-none"
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
                        <FormLabel>Timeline</FormLabel>
                        <Select onValueChange={handleSelectTimeline}>
                          <SelectTrigger className="w-[240px]">
                            <SelectValue placeholder="Select Deadline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fixed">
                              Fixed Deadline
                            </SelectItem>
                            <SelectItem value="ongoing">On-going</SelectItem>
                          </SelectContent>
                        </Select>
                        {timeline === "fixed" && (
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  disabled={loading}
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
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date() ||
                                  date > new Date("2027-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        )}

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="members"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>
                          How many members will your project have?
                        </FormLabel>
                        <FormControl>
                          <Select
                            disabled={loading}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="2-3 Members" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="2-3 members">
                                  2 - 3 members
                                </SelectItem>
                                <SelectItem value="4-5 members">
                                  4 - 5 members
                                </SelectItem>
                                <SelectItem value="6-7 members">
                                  6 - 7 members
                                </SelectItem>
                                <SelectItem value="8-9 members">
                                  8 - 9 members
                                </SelectItem>
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
                        <FormLabel>
                          How often is the client involved with the development?
                        </FormLabel>
                        <FormControl>
                          <Select
                            disabled={loading}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue
                                defaultValue="Weekly"
                                placeholder="Weekly"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="Weekly">Weekly</SelectItem>
                                <SelectItem value="Bi-Weekly">
                                  Bi-Weekly
                                </SelectItem>
                                <SelectItem value="Monthly">Monthly</SelectItem>
                                <SelectItem value="At Major Milestones">
                                  At Major Milestones
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="scope"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>
                          How stable are the scope and requirements?
                        </FormLabel>
                        <FormControl>
                          <Select
                            disabled={loading}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue
                                defaultValue="Very Stable"
                                placeholder="Very Stable"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="Very Stable">
                                  Very Stable
                                </SelectItem>
                                <SelectItem value="Somewhat Stable">
                                  Somewhat Stable
                                </SelectItem>
                                <SelectItem value="Uncertain">
                                  Uncertain
                                </SelectItem>
                                <SelectItem value="Highly Unstable">
                                  Highly Unstable
                                </SelectItem>
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
                        <FormLabel>
                          Approximate testing time for the project:
                        </FormLabel>
                        <FormControl>
                          <Select
                            disabled={loading}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue
                                defaultValue="Manual Testing"
                                placeholder="Manual Testing"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="Manual Testing">
                                  Manual Testing
                                </SelectItem>
                                <SelectItem value="Automated Testing">
                                  Automated Testing
                                </SelectItem>
                                <SelectItem value="Both Manual and Automated">
                                  Both Manual and Automated
                                </SelectItem>
                                <SelectItem value="No Formal QA Process">
                                  No Formal QA Process
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="reqs"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">
                            Resource Availability
                          </FormLabel>
                          <FormDescription>
                            Select available resources for your project
                            development
                          </FormDescription>
                        </div>
                        {requirements.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="reqs"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              item.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maintenance"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>
                          Maintenance and Post-Deployment Support
                        </FormLabel>
                        <FormControl>
                          <Select
                            disabled={loading}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue
                                defaultValue="On-Going Support"
                                placeholder="On-Going Support"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="On-Going Support">
                                  On-Going Support
                                </SelectItem>
                                <SelectItem value="Limited Support">
                                  Limited Support
                                </SelectItem>
                                <SelectItem value="No Support Planned">
                                  No Support Planned"
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="risk"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Risk and Uncertainty</FormLabel>
                        <FormControl>
                          <Select
                            disabled={loading}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue
                                defaultValue="Low"
                                placeholder="Low"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="Low">Low</SelectItem>
                                <SelectItem value="Moderate">
                                  Moderate
                                </SelectItem>
                                <SelectItem value="High">High</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="devtools"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Development Tools</FormLabel>
                        <FormControl>
                          <Textarea
                            disabled={loading}
                            placeholder="What are the software tools you are going to use for your project??"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button disabled={loading} type="submit" className="mt-10 w-40">
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <>Proceed</>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default ProjectInformationPage;
