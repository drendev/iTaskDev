"use client";

import { ProjectInformation } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useModal } from "@/hooks/use-modal-store";
import { ProjectWithInformation } from "@/types";
import { Info } from "lucide-react";

interface RenderInformationProps {
  info: ProjectInformation;
}

export const RenderInformation = ({ info }: RenderInformationProps) => {
  const router = useRouter();
  const { onOpen } = useModal();

  const onSubmit = async () => {
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

  return (
    <div className="flex flex-col">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CardTitle>Confirm project details</CardTitle>
          </div>
          <CardDescription>
            Details provided will be used for SDLC selection.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-10">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Project Description:</CardTitle>
              </CardHeader>
              <CardContent>{info.description}</CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Project Due Date:</CardTitle>
              </CardHeader>
              <CardContent>{info.dueDate.toString()}</CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Project Members:</CardTitle>
              </CardHeader>
              <CardContent>{info.members}</CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Project Deployment:</CardTitle>
              </CardHeader>
              <CardContent>{info.deployment.toString()}</CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Project Client Involvement:</CardTitle>
              </CardHeader>
              <CardContent>{info.clientInvolvement.toString()}</CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Project Complex Features:</CardTitle>
              </CardHeader>
              <CardContent>{info.complexFeatures.toString()}</CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Project Initial Number of Tasks:</CardTitle>
              </CardHeader>
              <CardContent>{info.tasks}</CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Project Testing:</CardTitle>
              </CardHeader>
              <CardContent>{info.testing}</CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="w-40" variant="ghost" onClick={() => onOpen("editInformation", { info: info })}>
            Edit Details
          </Button>
          <Button className="w-40" onClick={onSubmit}>
            Proceed
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
