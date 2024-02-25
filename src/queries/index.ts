import { createQueryKeys, mergeQueryKeys } from "@lukemorales/query-key-factory";
import { apiTodoService } from "../api/services/todoService";

export const todosKeys = createQueryKeys("todos", {
    detail: (todoId: string) => [todoId],
    list: () => ({
        queryKey: ["todos", "list"],
        queryFn: () => apiTodoService.getAllTodos(),
    }),
});

export const queryKeys = mergeQueryKeys(todosKeys);
