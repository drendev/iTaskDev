"use client";

import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover"
import { Smile } from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useTheme } from "next-themes";

interface EmojiPickerProps {
    onChange: (value: string) => void;
}

export const EmojiPicker = ({
    onChange
}: EmojiPickerProps) => {

    return (
        <Popover>
            <PopoverTrigger>
                <Smile
                className="text-zinc-500 hover:text-zinc-700 cursor-pointer transition"
                />
            </PopoverTrigger>
            <PopoverContent 
            side="right" 
            sideOffset={40}
            className="bg-transparent border-none shadow-none drop-shadow-none mb-16"
            >
                <Picker
                data={data}
                onEmojiSelect={(emoji: any) => onChange(emoji.native)}
                />
            </PopoverContent>
        </Popover>
    )
}