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

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const formSchema = z.object({
  description: z.string().min(20, {
    message: "Input must be at least 20 characters.",
  }),
});

const sdlcPicLinks = {
  waterfall: "/sdlc/waterfall.png",
  scrum: "/sdlc/scrum.png",
  kanban: "/sdlc/kanban.png",
  devops: "/sdlc/devops.png",
  lean: "/sdlc/lean.png",
  spiral: "/sdlc/spiral.png",
  iterative: "/sdlc/iterative.png",
  vshape: "/sdlc/vshape.png",
  rad: "/sdlc/rad.png",
};

const sdlcColor = {
  waterfall: "#3b82f6",
  scrum: "#f59e0b",
  kanban: "#06b6d4",
  devops: "#d946ef",
  lean: "#ef4444",
  spiral: "#f43f5e",
  iterative: "#84cc16",
  vshape: "#ec4899",
  rad: "#14b8a6",
};

const sdlcDescription = {
  waterfall:
    "The Waterfall Model was the first Process Model to be introduced. It is also referred to as a linear-sequential life cycle model. It is very simple to understand and use. In a waterfall model, each phase must be completed before the next phase can begin and there is no overlapping in the phases.",
  scrum:
    "Scrum is a framework for project management that emphasizes teamwork, accountability and iterative progress toward a well-defined goal. The framework begins with a simple premise: Start with what can be seen or known. After that, track the progress and tweak, as necessary.",
  kanban:
    "Kanban development is a highly visual lean Agile methodology that focuses on just-in-time delivery while closely monitoring functionality and managing the amount of work in progress (WIP). This approach is incremental rather than iterative. Kanban is about evolution, not revolution. When using Kanban for software development, you develop your product in one Kanban software development life cycle (SDLC). This approach is also a great example of the Agile methodology as it references the twelve principles mentioned in the Agile manifesto.",
  devops:
    "DevOps is a software development process that emphasises developer and operations team communication. It promotes timely feedback, which expedites the identification of any flaws or problems during the development process. This makes it an ideal strategy for large-scale endeavours.",
  lean: "Lean Software Development (LSD) is an agile framework used to streamline and optimize the software development process. It may also be referred to as the Minimum Viable Product (MVP) strategy as these ways of thinking are very similar since both intend to speed up development by focusing on new deliverables.",
  spiral:
    "The Spiral Model is one of the most important Software Development Life Cycle models. The Spiral Model is a combination of the waterfall model and the iterative model. It provides support for Risk Handling. The Spiral Model was first proposed by Barry Boehm. This article focuses on discussing the Spiral Model in detail.",
  iterative:
    "In the Iterative model, iterative process starts with a simple implementation of a small set of the software requirements and iteratively enhances the evolving versions until the complete system is implemented and ready to be deployed.",
  vshape:
    "The V-model is a type of SDLC model where the process executes sequentially in a V-shape. It is also known as the Verification and Validation model. It is based on the association of a testing phase for each corresponding development stage. The development of each step is directly associated with the testing phase. The next phase starts only after completion of the previous phase i.e., for each development activity, there is a testing activity corresponding to it. ",
  rad: "The V-model is a type of SDLC model where the process executes sequentially in a V-shape. It is also known as the Verification and Validation model. It is based on the association of a testing phase for each corresponding development stage. The development of each step is directly associated with the testing phase. The next phase starts only after completion of the previous phase i.e., for each development activity, there is a testing activity corresponding to it. ",
};

export default function OpenAI() {
  const [completion, setCompletion] = useState<string[]>([]);
  const [sdlcImg, setSdlcImg] = useState<string>("");
  const [confPercent, setConfPercent] = useState<number>(0);
  const [sdlcColorTheme, setSdlcColorTheme] = useState<string>("");
  const [sdlcDesc, setSdlcDesc] = useState<string>("");
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
    const res = await fetch("http://localhost:3000/api/openapi", {
      method: "POST",
      body: JSON.stringify(values),
    });

    const data = await res.json();
    console.log(data);
    const dataContent = data.content;

    const sectionsArray = dataContent.split(/\s*=====+\s*/);
    const filteredArray: string[] = sectionsArray.filter(
      (section: string) => section.trim() !== ""
    );
    const numberOnly = parseInt(filteredArray[1].replace("%", ""), 10);
    setConfPercent(numberOnly);

    console.log(filteredArray);
    setCompletion(filteredArray);

    if (filteredArray[0].toLowerCase() == "waterfall") {
      setSdlcImg(sdlcPicLinks.waterfall);
      setSdlcColorTheme(sdlcColor.waterfall);
      setSdlcDesc(sdlcDescription.waterfall);
    } else if (filteredArray[0].toLowerCase() == "scrum") {
      setSdlcImg(sdlcPicLinks.scrum);
      setSdlcColorTheme(sdlcColor.scrum);
      setSdlcDesc(sdlcDescription.scrum);
    } else if (filteredArray[0].toLowerCase() == "kanban") {
      setSdlcImg(sdlcPicLinks.kanban);
      setSdlcColorTheme(sdlcColor.kanban);
      setSdlcDesc(sdlcDescription.kanban);
    } else if (filteredArray[0].toLowerCase() == "devops") {
      setSdlcImg(sdlcPicLinks.devops);
      setSdlcColorTheme(sdlcColor.devops);
      setSdlcDesc(sdlcDescription.devops);
    } else if (filteredArray[0].toLowerCase() == "lean") {
      setSdlcImg(sdlcPicLinks.lean);
      setSdlcColorTheme(sdlcColor.lean);
      setSdlcDesc(sdlcDescription.lean);
    } else if (filteredArray[0].toLowerCase() == "spiral") {
      setSdlcImg(sdlcPicLinks.spiral);
      setSdlcColorTheme(sdlcColor.spiral);
      setSdlcDesc(sdlcDescription.spiral);
    } else if (filteredArray[0].toLowerCase() == "iterative") {
      setSdlcImg(sdlcPicLinks.iterative);
      setSdlcColorTheme(sdlcColor.iterative);
      setSdlcDesc(sdlcDescription.iterative);
    } else if (filteredArray[0].toLowerCase() == "v-shape") {
      setSdlcImg(sdlcPicLinks.vshape);
      setSdlcColorTheme(sdlcColor.vshape);
      setSdlcDesc(sdlcDescription.vshape);
    } else if (filteredArray[0].toLowerCase() == "rad") {
      setSdlcImg(sdlcPicLinks.rad);
      setSdlcColorTheme(sdlcColor.rad);
      setSdlcDesc(sdlcDescription.rad);
    }

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
                      <>
                        <DialogHeader>
                          <DialogTitle className="mx-auto text-3xl">
                            {completion[0]}
                          </DialogTitle>
                        </DialogHeader>

                        <Image
                          src={sdlcImg}
                          width={500}
                          height={500}
                          alt="waterfall"
                          className="mx-auto mt-10"
                        />
                        <div className="flex justify-center mt-24 mb-24">
                          <p className="flex items-center w-20 mr-20 text-xl">
                            Confidence Percentage:
                          </p>
                          <div style={{ width: 200, height: 200 }}>
                            <CircularProgressbar
                              value={confPercent}
                              text={completion[1]}
                              styles={buildStyles({
                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                strokeLinecap: "butt",

                                // Text size
                                textSize: "16px",

                                // How long animation takes to go from one percentage to another, in seconds
                                pathTransitionDuration: 0.5,

                                // Can specify path transition in more detail, or remove it entirely
                                // pathTransition: 'none',

                                // Colors
                                pathColor: `${sdlcColorTheme}`,
                                textColor: `${sdlcColorTheme}`,
                                trailColor: "#e5e7eb",
                                backgroundColor: "#3e98c7",
                              })}
                            />
                          </div>
                        </div>
                        <div>
                          <p className="my-3">{sdlcDesc}</p>
                        </div>
                        <div>
                          <p className="text-2xl my-3">Timeline</p>
                          <Separator className="text-blue-800" />
                          <p className="my-3">{completion[2]}</p>
                        </div>
                        <div>
                          <p className="text-2xl my-3">Team Size</p>
                          <Separator />
                          <p className="my-3">{completion[3]}</p>
                        </div>
                        <div>
                          <p className="text-2xl my-3">Complex Features</p>
                          <Separator />
                          <p className="my-3">{completion[4]}</p>
                        </div>
                        <div>
                          <p className="text-2xl my-3">Client Involvement</p>
                          <Separator />
                          <p className="my-3">{completion[5]}</p>
                        </div>
                        <div>
                          <p className="text-2xl my-3">
                            Scope and Requirements Stability
                          </p>
                          <Separator />
                          <p className="my-3">{completion[6]}</p>
                        </div>
                        <div>
                          <p className="text-2xl my-3">
                            Resource Availability and Skill Levels
                          </p>
                          <Separator />
                          <p className="my-3">{completion[7]}</p>
                        </div>
                        <div>
                          <p className="text-2xl my-3">
                            Quality Assurance and Testing
                          </p>
                          <Separator />
                          <p className="my-3">{completion[8]}</p>
                        </div>
                        <div>
                          <p className="text-2xl my-3">Deployment</p>
                          <Separator />
                          <p className="my-3">{completion[9]}</p>
                        </div>

                        <DialogFooter>
                          <DialogClose asChild>
                            <Button
                              type="button"
                              className={`bg-[${sdlcColorTheme}]`}
                              onClick={() => setModalOpen(false)}
                            >
                              Close
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </>
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
        </div>
      </div>
    </>
  );
}
