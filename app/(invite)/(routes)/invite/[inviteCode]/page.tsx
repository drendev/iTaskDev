import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { toast } from "sonner";
interface InviteCodePageProps {
    params: {
        inviteCode: string;
    };
    searchParams: {
        success: string;
    }
}

const InviteCodePage = async ({
    params
}: InviteCodePageProps) => {

    const user = await currentUser();

    if (!user?.id) {
        return redirect('/auth/login');
    }

    if (!params.inviteCode) {
        return redirect('/');
    }

    const isInviteCodeValid = await db.workspace.findFirst({
        where: {
            joinCode: params.inviteCode,
        },
        select: {
            joinCode: true
        }
    });

    if (!isInviteCodeValid) {
        return redirect(`/projects?error=invalid`);
    }

    const existingProject = await db.workspace.findFirst({
        where: {
            joinCode: params.inviteCode,
            members: {
                some: {
                    userId: user.id
                }
            }
        }
    });

    if (existingProject) {
        return redirect(`/projects/${existingProject.id}?success=already`);
    }

    const isProjectPrivate = await db.workspace.findFirst({
        where: {
            joinCode: params.inviteCode,
        },
        select: {
            isPrivate: true
        }
    })

    const isAlreadyPending = await db.workspace.findFirst({
        where: {
            joinCode: params.inviteCode,
            pending: {
                some: {
                    userId: user.id
                }
            }
        }
    })

    if (isProjectPrivate?.isPrivate === true) {

        if (isAlreadyPending) {
            return redirect('/projects?error=already');
        }
        
        const pendingMember = await db.workspace.update({
            where: {
                joinCode: params.inviteCode
            },
            data: {
                pending: {
                    create: [
                        {
                            userId: user.id
                        }
                    ]
                }
            }
        })

        if (pendingMember) {
            return redirect('/projects?success=pending');
        }

        
    } else if (isProjectPrivate?.isPrivate === false) {
        const project = await db.workspace.update({
            where: {
                joinCode: params.inviteCode
            },
            data: {
                members: {
                    create: [
                        {
                            userId: user.id
                        }
                    ]
                }
            }
        })
        if (project) {
            return redirect(`/projects/${project.id}?success=joined`);
        }
    }
    

    

    return (
        <div>
            Ooops! Its looks like you are not supposed to be here.
        </div>
    )
}

export default InviteCodePage;