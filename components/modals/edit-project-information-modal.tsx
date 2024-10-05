"use client";

import axios from "axios";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Checkbox } from "@/components/ui/checkbox";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "../ui/input";

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
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";

import { useForm } from "react-hook-form";

import { Loader2, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollArea } from "../ui/scroll-area";

const formSchema = z.object({
  description: z.string().min(12, "Minimum of 12 characters"),
  dueDate: z
    .date()
    .min(new Date(), "Due date must be in the future")
    .optional(),
  members: z.preprocess(
    (value) => Number(value),
    z
      .number()
      .min(1, "Members cannot be empty")
      .max(100, "Maximum of 100 members")
  ),
  clientInvolvement: z.string().min(1, "Field is required"),
  scope: z.string().min(1, "Scope cannot be empty"),
  testing: z.string().min(1, "testing is required"),
  reqs: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  maintenance: z.string().min(1, "Field is required"),
  risk: z.string().min(1, "Field is required"),
  devtools: z.string().min(12, "Minimum of 12 characters"),
});

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

export const EditProjectInformationModal = () => {
  const user = useCurrentUser();

  const [timeline, setTimeline] = useState("");

  const handleSelectTimeline = (value: string) => {
    setTimeline(value);
  };

  const { isOpen, onClose, type, data } = useModal();

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const { info } = data;
  const isModalOpen = isOpen && type === "editInformation";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: info?.description,
      dueDate: undefined,
      members: info?.members,
      clientInvolvement: info?.clientInvolvement,
      scope: info?.scope,
      testing: info?.testing,
      reqs: info?.reqs,
      maintenance: info?.maintenance,
      risk: info?.risk,
      devtools: info?.devtools,
    },
  });

  useEffect(() => {
    if (info) {
      form.reset({
        description: info?.description,
        dueDate: undefined,
        members: info?.members,
        clientInvolvement: info?.clientInvolvement,
        scope: info?.scope,
        testing: info?.testing,
        reqs: info?.reqs,
        maintenance: info?.maintenance,
        risk: info?.risk,
        devtools: info?.devtools,
      });
    }
  }, [info, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      console.log(values.reqs);
      await axios.post(`/api/workspaces/${info?.workspaceId}/create/edit`, {
        description: values.description,
        dueDate: values.dueDate ? values.dueDate : null,
        members: values.members,
        clientInvolvement: values.clientInvolvement,
        scope: values.scope,
        testing: values.testing,
        reqs: values.reqs,
        maintenance: values.maintenance,
        risk: values.risk,
        devtools: values.devtools,
      });

      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-4 overflow-hidden">
        <DialogHeader className="px-6">
          <DialogTitle>Edit Project Details</DialogTitle>
          <DialogDescription>
            Edit project details to better suit your needs
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className="w-full space-y-5 p-3 h-full"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <ScrollArea className="max-h-[420px] h-full">
              <div className="p-3">
                <FormField
                  control={form.control}
                  name="description"
                  disabled={loading}
                  defaultValue={info?.description}
                  render={({ field }) => (
                    <FormItem className="mb-3">
                      <FormLabel className="font-semibold">
                        {" "}
                        Project Description :
                      </FormLabel>
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
                      <FormLabel>Timeline</FormLabel>
                      <Select onValueChange={handleSelectTimeline}>
                        <SelectTrigger className="w-[240px]">
                          <SelectValue placeholder="Select Deadline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fixed">Fixed Deadline</SelectItem>
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
                          <PopoverContent className="w-auto p-0" align="start">
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
                        <Input
                          type="number"
                          min={1}
                          max={100}
                          disabled={loading}
                          placeholder="Number of members"
                          {...field}
                        />
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
                                No Support Planned
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
                            <SelectValue defaultValue="Low" placeholder="Low" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Low">Low</SelectItem>
                              <SelectItem value="Moderate">Moderate</SelectItem>
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
            </ScrollArea>
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <>Save</>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
