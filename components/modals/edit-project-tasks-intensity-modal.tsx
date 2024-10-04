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
          <DialogTitle>Edit Task Intensity</DialogTitle>
          <DialogDescription>
            Edit project details to better suit your needs
          </DialogDescription>
        </DialogHeader>

    
      </DialogContent>
    </Dialog>
  );
};
