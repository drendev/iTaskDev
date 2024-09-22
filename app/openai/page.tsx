"use client";

import React from "react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PiQuestionThin } from "react-icons/pi";
import { PiSparkle } from "react-icons/pi";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  description: z.string().min(20, {
    message: "Input must be at least 20 characters.",
  }),
});

export default function OpenAI() {
  const [data, setData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setDisabled(true);
    console.log(JSON.stringify(values));
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const res = await fetch("http://localhost:3000/api/openapi", {
      method: "POST",
      body: JSON.stringify(values),
    });

    const data = await res.json();
    console.log(data);
    setData(data);
    setLoading(false);
    setDisabled(false);
    setModalOpen(true);
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-center min-h-screen bg-gray-100">
        <div className="relative">
          <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
            {/* Left Side */}
            <div className="flex flex-col md:p-14">
              <TooltipProvider>
                <Tooltip>
                  <div className="flex text-2xl mb-10 gap-2 items-center">
                    <PiSparkle className="text-purple-600 h-8 w-8" />
                    DevIntel{" "}
                    <TooltipTrigger>
                      <PiQuestionThin className="hover:opacity-50" />
                    </TooltipTrigger>
                  </div>
                  <TooltipContent side="right">
                    <p>
                      Find the best SDLC Methodology for your <br />
                      project with the power of NLP
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Describe your project</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Example: We're building an Inventory Management System for ABC Retail Corp in 9 months, with a 12-person team focusing on AI-powered stock prediction, RFID tracking, and real-time notifications. The first 3 months will cover requirements gathering and prototype development, with bi-weekly meetings to align with client goals, and continuous testing throughout the project. The system will be deployed on Google Cloud using CI/CD pipelines, with 12 months of post-deployment support for bug fixes and performance monitoring."
                            {...field}
                            className="resize-none h-[350px] w-96"
                          />
                        </FormControl>
                        <FormDescription>
                          More detailed descriptions provide more accurate
                          results.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Dialog
                    open={modalOpen}
                    onOpenChange={() => setModalOpen(false)}
                  >
                    <DialogTrigger asChild>
                      <Button type="submit" disabled={disabled}>
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing
                          </>
                        ) : (
                          <> Submit </>
                        )}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] md:min-w-[1000px] md:max-h-[700px] overflow-y-scroll max-h-screen">
                      {data === "waterfall" && (
                        <>
                          <DialogHeader>
                            <DialogTitle className="mx-auto text-3xl">
                              Waterfall
                            </DialogTitle>
                          </DialogHeader>

                          <Image
                            src="/sdlc/waterfall.png"
                            width={500}
                            height={500}
                            alt="waterfall"
                            className="mx-auto"
                          />
                          <div>
                            <p className="my-3">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat. Duis aute irure
                              dolor in reprehenderit in voluptate velit esse
                              cillum dolore eu fugiat nulla pariatur. Excepteur
                              sint occaecat cupidatat non proident, sunt in
                              culpa qui officia deserunt mollit anim id est
                              laborum.
                            </p>
                          </div>
                          <div>
                            <p className="text-2xl my-3">Timeline</p>
                            <Separator className="text-blue-800" />
                            <p className="my-3">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat. Duis aute irure
                              dolor in reprehenderit in voluptate velit esse
                              cillum dolore eu fugiat nulla pariatur. Excepteur
                              sint occaecat cupidatat non proident, sunt in
                              culpa qui officia deserunt mollit anim id est
                              laborum.
                            </p>
                          </div>
                          <div>
                            <p className="text-2xl my-3">Team Size</p>
                            <Separator />
                            <p className="my-3">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat. Duis aute irure
                              dolor in reprehenderit in voluptate velit esse
                              cillum dolore eu fugiat nulla pariatur. Excepteur
                              sint occaecat cupidatat non proident, sunt in
                              culpa qui officia deserunt mollit anim id est
                              laborum.
                            </p>
                          </div>
                          <div>
                            <p className="text-2xl my-3">Complex Features</p>
                            <Separator />
                            <p className="my-3">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat. Duis aute irure
                              dolor in reprehenderit in voluptate velit esse
                              cillum dolore eu fugiat nulla pariatur. Excepteur
                              sint occaecat cupidatat non proident, sunt in
                              culpa qui officia deserunt mollit anim id est
                              laborum.
                            </p>
                          </div>
                          <div>
                            <p className="text-2xl my-3">Client Involvement</p>
                            <Separator />
                            <p className="my-3">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat. Duis aute irure
                              dolor in reprehenderit in voluptate velit esse
                              cillum dolore eu fugiat nulla pariatur. Excepteur
                              sint occaecat cupidatat non proident, sunt in
                              culpa qui officia deserunt mollit anim id est
                              laborum.
                            </p>
                          </div>
                          <div>
                            <p className="text-2xl my-3">
                              Scope and Requirements Stability
                            </p>
                            <Separator />
                            <p className="my-3">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat. Duis aute irure
                              dolor in reprehenderit in voluptate velit esse
                              cillum dolore eu fugiat nulla pariatur. Excepteur
                              sint occaecat cupidatat non proident, sunt in
                              culpa qui officia deserunt mollit anim id est
                              laborum.
                            </p>
                          </div>
                          <div>
                            <p className="text-2xl my-3">
                              Resource Availability and Skill Levels
                            </p>
                            <Separator />
                            <p className="my-3">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat. Duis aute irure
                              dolor in reprehenderit in voluptate velit esse
                              cillum dolore eu fugiat nulla pariatur. Excepteur
                              sint occaecat cupidatat non proident, sunt in
                              culpa qui officia deserunt mollit anim id est
                              laborum.
                            </p>
                          </div>
                          <div>
                            <p className="text-2xl my-3">
                              Quality Assurance and Testing
                            </p>
                            <Separator />
                            <p className="my-3">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat. Duis aute irure
                              dolor in reprehenderit in voluptate velit esse
                              cillum dolore eu fugiat nulla pariatur. Excepteur
                              sint occaecat cupidatat non proident, sunt in
                              culpa qui officia deserunt mollit anim id est
                              laborum.
                            </p>
                          </div>
                          <div>
                            <p className="text-2xl my-3">Deployment</p>
                            <Separator />
                            <p className="my-3">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat. Duis aute irure
                              dolor in reprehenderit in voluptate velit esse
                              cillum dolore eu fugiat nulla pariatur. Excepteur
                              sint occaecat cupidatat non proident, sunt in
                              culpa qui officia deserunt mollit anim id est
                              laborum.
                            </p>
                          </div>

                          <DialogFooter>
                            <DialogClose asChild>
                              <Button
                                type="button"
                                className="bg-blue-500"
                                onClick={() => setModalOpen(false)}
                              >
                                Close
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </>
                      )}
                    </DialogContent>
                  </Dialog>
                </form>
              </Form>
            </div>

            {/* Right Side */}
            <div className="hidden md:flex flex-col w-96 p-10 mr-5 items-center justify-center">
              <p>Guide Questions</p>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Timeline</AccordionTrigger>
                  <AccordionContent>
                    What is the timeframe of your project?
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Team Size</AccordionTrigger>
                  <AccordionContent>
                    How many are you in the team?
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Complex Features</AccordionTrigger>
                  <AccordionContent>
                    Does the system involve unfamiliar features? (e.g.
                    Artificial Intelligence)
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Client Involvement</AccordionTrigger>
                  <AccordionContent>
                    How much does the client monitor the process and give their
                    own feedback?
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    Scope and Requirements Stability
                  </AccordionTrigger>
                  <AccordionContent>
                    How well-defined and consistent the project requirements are
                    over time?
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>Resource Availability</AccordionTrigger>
                  <AccordionContent>
                    Do you have the necessary human, technical and financial
                    resources?
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-7">
                  <AccordionTrigger>
                    Quality Assurance and Testing
                  </AccordionTrigger>
                  <AccordionContent>
                    How often do you want to ensure the software functions
                    correctly and meet specified requirements?
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-8">
                  <AccordionTrigger>Deployment</AccordionTrigger>
                  <AccordionContent>
                    How do you want your system to be deployed?
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          <div className="flex">{data ? data : "loading"}</div>
        </div>
      </div>
    </>
  );
}
