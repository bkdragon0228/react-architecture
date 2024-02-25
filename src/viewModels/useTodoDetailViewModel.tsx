import { useEffect, useState } from "react";
import { useTodoDetailStore } from "../stores";
import { apiTodoService } from "../api/services/todoService";

const useTodoDetailViewModel = (todoId: string) => {
    const { setTodoDetail, todoDetail, updateTodoDetail } = useTodoDetailStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const fetchTodoDetail = async (todoId: string) => {
        try {
            setIsLoading(true);
            const response = await apiTodoService.getTodoById(todoId);
            if (response.data) {
                setTodoDetail(response.data);
            }
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const saveTodoDetail = async (todoId: string) => {
        try {
            setIsLoading(true);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (todoId) {
            fetchTodoDetail(todoId);
        }
    }, [todoId]);

    return {
        todoDetail,
        fetchTodoDetail,
        updateTodoDetail,
        saveTodoDetail,
        isLoading,
        error,
    };
};

export default useTodoDetailViewModel;
