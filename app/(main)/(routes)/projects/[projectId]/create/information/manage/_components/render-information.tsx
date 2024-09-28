"use client";

import { ProjectInformation } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ClipboardCheck } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useModal } from "@/hooks/use-modal-store";

interface RenderInformationProps {
  info: ProjectInformation;
}

export const RenderInformation = ({ info }: RenderInformationProps) => {
  const router = useRouter();

  const onSubmit = async () => {
    console.log("CLicked");
    try {
      const response = await axios.post("/api/openapi", {
        description: info.description,
        dueDate: info.dueDate.toString(),
        members: info.members,
        deployment: info.deployment.toString(),
        clientInvolvement: info.clientInvolvement.toString(),
        complexFeatures: info.complexFeatures.toString(),
        tasks: info.tasks,
        testing: info.testing,
        projectId: info.workspaceId,
      });
      router.push(`/projects/${info.workspaceId}/create/sdlc`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onPrevious = () => {
    router.push(`/projects/${info.workspaceId}/create/information`);
  };

  return (
    <div className="flex flex-col">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center gap-3">
            <ClipboardCheck size={50} />
            <CardTitle>Confirm project details</CardTitle>
          </div>
          <CardDescription>
            Details provided will be used for SDLC selection.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-col-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-lg">Project Description:</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">{info.description}</CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-lg">Project Due Date:</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                {info.dueDate.toString()}
              </CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-lg">Project Members:</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">{info.members}</CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-lg">Project Deployment:</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                {info.deployment.toString()}
              </CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-lg">
                  Project Client Involvement:
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                {info.clientInvolvement.toString()}
              </CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-lg">
                  Project Complex Features:
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                {info.complexFeatures.toString()}
              </CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-lg">
                  Project Initial Number of Tasks:
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">{info.tasks}</CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-lg">Project Testing:</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">{info.testing}</CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className="w-40" variant="ghost" onClick={onPrevious}>
            Go back
          </Button>
          <Button className="w-40" onClick={onSubmit}>
            Proceed
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
