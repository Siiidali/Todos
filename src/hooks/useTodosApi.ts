import { useQuery, useMutation, useQueryClient } from "react-query";

export const useTodosApi = (method: string, fn: any) => {
  const queryClient = useQueryClient();
  if (method === "GET") {
    return useQuery(["Todos", "todo"], {
      queryFn: async () => {
        return await fn();
      },
    });
  } else if (method === "POST") {
    return useMutation({
      mutationFn: async (data) => {
        console.log(data);
        return await fn(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["Todos", "todo"]);
      },
    });
  } else if ((method = "PATCH")) {
    return useMutation({
      mutationFn: async (args: { id: number; data: any }) => {
        const { data, id } = args;
        return await fn(id, data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["Todos", "todo"]);
      },
    });
  } else {
    return useMutation({
      mutationFn: async (args: { id: number }) => {
        const { id } = args;
        return await fn(id);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["Todos", "todo"]);
      },
    });
  }
};
