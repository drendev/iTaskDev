"use client";

import { ProjectInformation } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Loader2 } from "lucide-react";

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
import { useState } from "react";

interface RenderInformationProps {
  info: ProjectInformation;
}

export const RenderInformation = ({ info }: RenderInformationProps) => {
  const router = useRouter();
  const { onOpen } = useModal();

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/openapi", {
        description: info.description,
        dueDate: info.dueDate ? info.dueDate.toString() : "On-going",
        members: info.members,
        clientInvolvement: info.clientInvolvement.toString(),
        scope: info.scope,
        testing: info.testing,
        reqs: info.reqs,
        maintenance: info.maintenance,
        risk: info.risk,
        devtools: info.devtools,
        projectId: info.workspaceId,
      });
      router.push(`/projects/${info.workspaceId}/create/sdlc`);
      console.log(response);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
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
                <CardTitle className="text-lg">
                  Project Scope and Complexity:
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">{info.description}</CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-lg">Project Due Date:</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                {info.dueDate ? info.dueDate.toString() : "On-Going"}
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
                  Scope and Requirements Stability:
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">{info.scope}</CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-lg">Project Testing:</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">{info.testing}</CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-lg">
                  Resources Availability:
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">{info.reqs}</CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-lg">Maintenance:</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">{info.maintenance}</CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-lg">Risk and Uncertainty:</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">{info.risk}</CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-lg">Development Tools:</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">{info.devtools}</CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-3">
          <Button
            className="w-40"
            variant="ghost"
            onClick={() => onOpen("editInformation", { info: info })}
          >
            Edit Details
          </Button>
          <Button disabled={loading} className="w-40" onClick={onSubmit}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>Proceed</>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
