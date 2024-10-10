import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { RenderSdlc } from "./_components/render-sdlc";
import ProgressBar from "../_components/progressbar";

interface RecommendSDLCPageProps {
  params: {
    projectId: string;
  };
}
const RecommendSDLCPage = async ({ params }: RecommendSDLCPageProps) => {
  const user = await currentUser();

  if (!user) {
    redirect("/auth/login");
  }

  const sdlc = await db.workspace.findUnique({
    where: {
      id: params.projectId,
    },
    select: {
      sdlc: true,
    },
  });

  if (!sdlc) {
    redirect(`/app/projects/${params.projectId}/create/information/manage`);
  }

  const recommendedSdlc = sdlc.sdlc;

  if (!recommendedSdlc) {
    redirect(`/app/projects/${params.projectId}/create/information/manage`);
  }

  const sdlcWithInformation = await db.projectSdlc.findUnique({
    where: {
      workspaceId: params.projectId,
    },
  });

  if (!sdlcWithInformation) {
    redirect(`/app/projects/${params.projectId}/create/information/manage`);
  }

  return (
    <div className="mt-5">
      <ProgressBar progress={50} />
      <RenderSdlc
        sdlc={recommendedSdlc}
        info={sdlcWithInformation}
        projectId={params.projectId}
      />
    </div>
  );
};

export default RecommendSDLCPage;
