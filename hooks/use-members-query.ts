
import { useQuery } from '@tanstack/react-query';

import axios from 'axios';

interface ChatQueryProps {
    queryKey: string;
    projectId: string;
};

export const useMembersQuery = ({
    queryKey,
    projectId
}: ChatQueryProps) =>  {

    const fetchCommits = async () => {

        const recentCommits = await axios.get(`/api/workspaces/${projectId}/create/members`);

        return recentCommits.data;
    };

    const { data, status } = useQuery({
        queryKey: [queryKey],
        queryFn: fetchCommits,
        refetchInterval: 500
    })

    return {
        data,
        status,
    };
}
