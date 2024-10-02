import qs from 'query-string';
import { useInfiniteQuery } from '@tanstack/react-query';

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

    const fetchCommits = async ({ pageParam = undefined }) => {

        const recentCommits = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`);

        return recentCommits.data;
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    } = useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: fetchCommits,
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        refetchInterval: 10,
        initialPageParam: undefined
    })

    return {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
      };
}
