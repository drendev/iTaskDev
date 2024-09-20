"use client";

interface SearchAllProps {
    data: {
        label: string;
        type: "project" | "features" | "setting" | "user",
        data: {
            icon: React.ReactNode;
            name: string;
            id: string;
        }[] | undefined;
    }[]
}

export const SearchAll = ({
    data
}: SearchAllProps) => {
    return (
        <div>
            Search in Project
        </div>
    )
}