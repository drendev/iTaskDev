import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { RenderInformation } from "./_components/render-information";

interface ManageInformationPageProps {
    params: {
        projectId: string;
    }
}

const ManageInformationPage = async ({
    params
}: ManageInformationPageProps) => {
    const user = await currentUser();

    if(!user) {
        return redirect("/");
    }

    const projectInformation = await db.projectInformation.findUnique({
        where: {
            workspaceId: params.projectId
        },
    })

    if (!projectInformation) {
        return redirect("/unauthorized");
    }

    return (
        <div>
            <RenderInformation info={projectInformation} />
        </div>
    )
}

export default ManageInformationPage;
