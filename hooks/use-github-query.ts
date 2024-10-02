
import { useQuery } from '@tanstack/react-query';

import axios from 'axios';

interface ChatQueryProps {
    repo: string;
    owner: string;
    queryKey: string;
};

export const useGithubQuery = ({
    repo,
    owner,
    queryKey,
}: ChatQueryProps) =>  {

    const fetchCommits = async () => {

        const recentCommits = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=5`);

        return recentCommits.data;
    };

    const { data, status } = useQuery({
        queryKey: [queryKey],
        queryFn: fetchCommits,
        refetchInterval: 1000
    })

    return {
        data,
        status,
    };
}
