export interface Todo {
    id: string;
    title: string;
    contents: string;
    isDone: boolean;
}

export type Todos = Todo[];
