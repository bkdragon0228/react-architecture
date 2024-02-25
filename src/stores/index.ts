import { create } from "zustand";
import { TodoDetailSlice, todoDetailSlice } from "./todo/todoDetailSlice";
import { useShallow } from "zustand/react/shallow";

export type MyStore = TodoDetailSlice;

export const useMyStore = create<MyStore>((set, get, store) => ({
    ...todoDetailSlice(set, get, store),
}));

export const useTodoDetailStore = () =>
    useMyStore(
        useShallow<MyStore, TodoDetailSlice>((state) => ({
            setTodoDetail: state.setTodoDetail,
            todoDetail: state.todoDetail,
            updateTodoDetail: state.updateTodoDetail,
        }))
    );
