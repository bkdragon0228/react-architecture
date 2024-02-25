import { StateCreator } from "zustand";
import { Todo } from "../../models/todo/todo";

export interface TodoDetailSlice {
    todoDetail: Todo | null;
    setTodoDetail: (todo: Todo) => void;
    updateTodoDetail: ({ title, contents, isDone }: Partial<Omit<Todo, "id">>) => void;
}

export const todoDetailSlice: StateCreator<TodoDetailSlice> = (set, get, _): TodoDetailSlice => ({
    todoDetail: null,
    setTodoDetail: (todo) => {
        set((prev) => ({ ...prev, todoDetail: todo }));
    },
    updateTodoDetail({ title, contents, isDone }) {
        const currentTodo = get().todoDetail;
        if (!currentTodo) return;

        const newTodo = {
            id: currentTodo.id,
            title: title || currentTodo.title,
            contents: contents || currentTodo.contents,
            isDone: isDone || currentTodo.isDone!,
        };

        set((prev) => ({ ...prev, todoDetail: newTodo }));
    },
});
