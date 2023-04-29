import { useMutation, useQuery, useQueryClient } from "react-query";

export const useNestedTodosApi = (method: string, fn: any) => {
  const queryClient = useQueryClient();
  if (method === "GET") {
    return useQuery(["Todos", "nestedTodos"], {
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
        queryClient.invalidateQueries(["Todos", "nestedTodos"]);
      },
    });
  } else if (method === "PATCH") {
    return useMutation({
      mutationFn: async (args: { id: number; data: any }) => {
        const { data, id } = args;
        return await fn(id, data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["Todos", "nestedTodos"]);
      },
    });
  } else {
    return useMutation({
      mutationFn: async (args: { id: number }) => {
        const { id } = args;
        return await fn(id);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["Todos", "nestedTodos"]);
      },
    });
  }
};
