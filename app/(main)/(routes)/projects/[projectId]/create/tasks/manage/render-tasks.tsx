"use client";

import { Task } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Loader2 } from "lucide-react";
import ProgressBar from "../../information/manage/_components/progressbar";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useModal } from "@/hooks/use-modal-store";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface RenderInformationProps {
  info: Task[];
}

export const RenderTasks = ({ info }: RenderInformationProps) => {
  return (
    <div className="flex flex-col">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center gap-3">
            <ClipboardCheck size={50} />
            <CardTitle>Confirm Tasks</CardTitle>
          </div>
          <CardDescription>
            Review your initial tasks for your project.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-4">
          {info.map((task, index) => (
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  Task<Badge>{task.Intensity}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p>{task.content}</p>
              </CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
          ))}
        </CardContent>
        <CardFooter className="flex justify-end space-x-3">
          <Button className="w-40">Proceed</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
