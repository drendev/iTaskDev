"use client";

import { useEffect, useState } from "react";

interface RepositoryDetailsProps {
    repo: string;
    owner: string;
    projectId: string;
}

interface RepoDetails {
    name: string;
    owner: {
        login: string;
    };
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    commits_count: number;
}

export const RenderRepositoryDetails = ({
    repo,
    owner,
    projectId,
}: RepositoryDetailsProps) => {
    const [repositoryDetails, setRepositoryDetails] = useState<RepoDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRepositoryDetails = async () => {
            setLoading(true);
            try {
                const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
                const data = await res.json();
                
                setRepositoryDetails({
                    ...data,
                    commits_count: data.commits_count || (await fetchCommitCount())
                });
            } catch (error) {
                console.error("Failed to fetch repository details:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchCommitCount = async () => {
            const res = await fetch(
                `https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`
            );
            const linkHeader = res.headers.get("Link");
            
            if (linkHeader) {
                const lastPageMatch = linkHeader.match(/&page=(\d+)>; rel="last"/);
                if (lastPageMatch) {
                    return parseInt(lastPageMatch[1], 10);
                }
            }
            return 1; 
        };

        fetchRepositoryDetails();
    }, [owner, repo]);

    if (!repositoryDetails) {
        return <div>Repository details not found</div>; // TODO
    }

    return (
        <div>
            <h1>{repositoryDetails.name}</h1>
            <p>Owner: {repositoryDetails.owner.login}</p>
            <p>Stars: {repositoryDetails.stargazers_count}</p>
            <p>Forks: {repositoryDetails.forks_count}</p>
            <p>Open Issues: {repositoryDetails.open_issues_count}</p>
            <p>Commits: {repositoryDetails.commits_count}</p>
        </div>
    );
};
