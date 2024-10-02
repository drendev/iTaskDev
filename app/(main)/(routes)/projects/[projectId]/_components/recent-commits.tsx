"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGithubQuery } from "@/hooks/use-github-query";
import { formatDistanceToNow } from 'date-fns';

interface RecentCommitsCardProps {
    projectId: string;
    repo: string;
    owner: string;
}

export const RecentCommitsCard = ({
    projectId,
    repo,
    owner
}: RecentCommitsCardProps) => {

    const { data, status } = useGithubQuery({
        repo: repo,
        owner: owner,
        queryKey: `github:${projectId}`
    });

    return (
        <Card className="row-span-2">
            <CardHeader>
                <CardTitle>Recent Github Commits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {status === 'pending' && <p>Loading commits...</p>}
                {status === 'error' && <p>Error fetching commits.</p>}
                {data?.map((commit: any, i: number) => (
                    <Card key={i} className="hover:bg-gray-200 cursor-pointer">
                        <CardHeader>
                            <div className="flex justify-between">
                                <Badge className="bg-blue-500">Commit</Badge>
                                <span className="text-sm text-gray-500">
                                    {formatDistanceToNow(new Date(commit.commit.author.date))} ago
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CardTitle className="text-lg">{commit.commit.message}</CardTitle>
                            </div>
                            <CardDescription>
                                {commit.commit.author.name} - {commit.sha.substring(0, 7)}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </CardContent>
            <CardFooter className="flex justify-between"></CardFooter>
        </Card>
    );
}
