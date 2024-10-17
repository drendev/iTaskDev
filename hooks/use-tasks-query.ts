import { useQuery } from "@tanstack/react-query";

import axios from "axios";

interface ChatQueryProps {
  queryKey: string;
  projectId: string;
}

export const useTasksQuery = ({ queryKey, projectId }: ChatQueryProps) => {
  const fetchTasks = async () => {
    const tasks = await axios.get(`/api/workspaces/${projectId}/tasks`);

    return tasks.data;
  };

  const { data, status } = useQuery({
    queryKey: [queryKey],
    queryFn: fetchTasks,
    refetchInterval: 500,
  });

  return {
    data,
    status,
  };
};
