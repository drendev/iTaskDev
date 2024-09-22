import { GoRocket } from "react-icons/go";

interface ChatWelcomeProps {
    name?: string;
    type: "Project Members Chat" | "direct";
}

export const ChatWelcome = ({
    name,
    type
}: ChatWelcomeProps) => {
    return (
        <div className="space-y-2 px-4 mb-4">
            {type === "Project Members Chat" && (
                <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 flex items-center justify-center">
                    <GoRocket 
                    className="h-12 w-12 text-white"
                    />
                </div>
            )}
            <p className="text-xl md:text-3xl font-bold">
                {type === "Project Members Chat" ? "Welcome to " : ""}{name}
            </p>
            <p className="text-zinc-600 text-sm">
                {type === "Project Members Chat"
                ? `This is ${name} project chat.`
                : `This is the start of your direct message with ${name}.`
                }
            </p>
        </div>
    )
}