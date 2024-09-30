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

import { toast } from "sonner";
import { Loader2, CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ProjectWithInformation } from "@/types";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollArea } from "../ui/scroll-area";

const formSchema = z.object({
    tasks: z
      .number()
      .min(1, "Minimum of 1 task")
      .max(100, "Maximum of 100 tasks"),
    description: z.string().min(12, "Minimum of 12 characters"),
    dueDate: z.date().min(new Date(), "Due date must be in the future"),
    complexFeatures: z.boolean(),
    clientInvolvement: z.string().min(1, "Client involvement is required"),
    deployment: z.boolean(),
    testing: z.string().min(1, "testing is required"),
    members: z.string().min(1, "Members cannot be empty"),
    scope: z.string().min(1, "Scope cannot be empty"),
  });

export const EditProjectInformationModal = () => {
    const user = useCurrentUser();

    const { isOpen, onClose, type, data } = useModal();
   
    const [loading, setLoading] = useState<boolean>(false);
    
    const router = useRouter();

    const { info } = data;
    const isModalOpen = isOpen && type === "editInformation";

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          tasks: info?.tasks,
          description: info?.description,
          dueDate: info?.dueDate,
          complexFeatures: info?.complexFeatures,
          clientInvolvement: info?.clientInvolvement,
          deployment: info?.deployment,
          testing: info?.testing,
          members: info?.members,
          scope: info?.scope,
        },
      });

      useEffect(() => {
        if (info) {
            form.reset({
                tasks: info?.tasks,
                description: info?.description,
                dueDate: info?.dueDate,
                complexFeatures: info?.complexFeatures,
                clientInvolvement: info?.clientInvolvement,
                deployment: info?.deployment,
                testing: info?.testing,
                members: info?.members,
                scope: info?.scope,
            });
        }
    }, [info, form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        try {
            setLoading(true);
              await axios.post(
                `/api/workspaces/${info?.workspaceId}/create/edit`,
                {
                  tasks: values.tasks,
                  description: values.description,
                  dueDate: values.dueDate,
                  complexFeatures: values.complexFeatures,
                  clientInvolvement: values.clientInvolvement,
                  deployment: values.deployment,
                  testing: values.testing,
                  members: values.members,
                  scope: values.scope,
                }
              );
        
            form.reset();
            router.refresh();
            onClose();
        } catch (error) {
            setLoading(false);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleClose = () => {
        onClose();
    }

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
                        defaultValue={info?.tasks}
                        name="tasks"
                        disabled={loading}
                        render={({ field }) => (
                          <FormItem className="mb-3">
                            <FormLabel className="font-semibold"> Number of Tasks : </FormLabel>
                            <FormControl>
                              <Input
                                className="w-96"
                                disabled={false}
                                placeholder="Number of Tasks"
                                type="number"
                                {...field}
                                min={1}
                                onChange={(e) => {
                                  const value = e.target.value
                                    ? Number(e.target.value)
                                    : "";
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
                        disabled={loading}
                        defaultValue={info?.description}
                        render={({ field }) => (
                          <FormItem className="mb-3">
                            <FormLabel className="font-semibold"> Project Description :</FormLabel>
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
                        disabled={loading}
                        defaultValue={info?.dueDate}
                        render={({ field }) => (
                          <FormItem className="flex flex-col mb-3">
                            <FormLabel className="font-semibold">Project Due Date :</FormLabel>
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
                      disabled={loading}
                      defaultValue={info?.complexFeatures ?? false}
                      render={({ field }) => (
                        <FormItem className="flex flex-col mb-3">
                          <FormLabel className="font-semibold">Does your project have complex features?</FormLabel>
                          <FormControl>
                            <Select
                              disabled={loading}
                              onValueChange={(value) => field.onChange(value === "true")}
                              value={field.value ? "true" : "false"}
                            >
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
                      disabled={loading}
                      defaultValue={info?.clientInvolvement}
                      render={({ field }) => (
                        <FormItem className="flex flex-col mb-3">
                          <FormLabel className="font-semibold">
                            How often is the client involved with the
                            development?
                          </FormLabel>
                          <FormControl>
                            <Select disabled={loading} onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue
                                  defaultValue="low"
                                  placeholder="Low"
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="low">Low</SelectItem>
                                  <SelectItem value="moderate">
                                    Moderate
                                  </SelectItem>
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
                        name="deployment"
                        disabled={loading}
                        defaultValue={info?.complexFeatures ?? false}
                        render={({ field }) => (
                          <FormItem className="flex flex-col mb-3">
                            <FormLabel className="font-semibold">
                              Does your project need to be deployed?
                            </FormLabel>
                            <FormControl>
                              <Select
                                disabled={loading}
                                onValueChange={(value) => field.onChange(value === "true")}
                                value={field.value ? "true" : "false"}
                              >
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
                        disabled={loading}
                        defaultValue={info?.testing}
                        render={({ field }) => (
                          <FormItem className="flex flex-col mb-3">
                            <FormLabel className="font-semibold">
                              Approximate testing time for the project:
                            </FormLabel>
                            <FormControl>
                              <Select disabled={loading} onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue
                                    defaultValue={info?.testing}
                                    placeholder="Low"
                                  >
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="moderate">
                                      Moderate
                                    </SelectItem>
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
                    name="scope"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>
                          How stable are the scope and requirements?
                        </FormLabel>
                        <FormControl>
                          <Select disabled={loading} onValueChange={field.onChange}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue
                                defaultValue="low"
                                placeholder="Low"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="moderate">
                                  Moderate
                                </SelectItem>
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
                        disabled={loading}
                        defaultValue={info?.members}
                        render={({ field }) => (
                          <FormItem className="flex flex-col mb-3">
                            <FormLabel className="font-semibold">
                              How many members will your project have?
                            </FormLabel>
                            <FormControl>
                              <Select disabled={loading} onValueChange={field.onChange} value={field.value}>
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
                        <>
                            Save
                        </>
                        )}
                    </Button>
                    </form>
                  </Form> 
            </DialogContent>
        </Dialog>
    )
}