import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queries";

const useTodoListViewModel = () => {
    return useQuery({
        select: (data) => data?.data,
        queryKey: queryKeys.todos.list().queryKey,
        queryFn: queryKeys.todos.list().queryFn,
    });
};

export default useTodoListViewModel;
