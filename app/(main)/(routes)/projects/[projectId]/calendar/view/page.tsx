import { DataCalendar } from "@/components/calendar/data-calendar";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

interface ViewCalendarProps {
    params: {
        projectId: string;
    }
}

const ViewCalendar = async ({
    params
}: ViewCalendarProps) => {

    const user = await currentUser();

    if (!user) {
        return
    }

    const task = await db.task.findMany({
        where: {
            projectId: params.projectId
        },
        include: {
            members: {
                include: {
                    member: {
                        include: {
                            user: true
                        }
                    }
                }
            }
        },
    });

    return(
        <div className="h-full flex flex-col">
        <DataCalendar data={task ?? []} />
        </div>
    )
}

export default ViewCalendar;