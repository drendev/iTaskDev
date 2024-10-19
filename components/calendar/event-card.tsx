import { UserAvatar } from "@/app/(invite)/(routes)/pending/_components/user-avatar";
import { cn } from "@/lib/utils";

interface EventCardProps {
    title: string;
    assignee: any;
/*     project: string; */
    status: string;
    id: string;
    intensity: string;
}

const intensityColorMap: Record<string, string> = {
    Hard: "border-l-red-500",
    Medium: "border-l-yellow-500",
    Easy: "border-l-green-500",
}

const truncateTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? title.substring(0, maxLength) + "..." : title;
};

export const EventCard = ({
    title,
    assignee,
/*     project, */
    status,
    id,
    intensity
}: EventCardProps) => {
    return (
        <div className="px-2 py-1">
            <div className={cn(
                "p-1.5 text-xs bg-white text-zinc-700 border rounded-md !border-l-4 flex flex-col gap-y-1.5 cursor-pointer hover:opacity-75 transition",
                intensityColorMap[intensity]
            )}>
                <p>{truncateTitle(title, 30)}</p>
                <div className="flex justify-between gap-x-1">
                    {assignee.map((member: any) => (
                        <UserAvatar
                            key={member.id}
                            src={member.image}
                            className="w-5 h-5"
                        />
                    ))}
                    <div className="text-xs font-bold">
                        {status}
                    </div>
                </div>
            </div>
        </div>
    )
}