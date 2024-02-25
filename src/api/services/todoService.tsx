// import { PropsWithChildren, createContext, useContext } from "react";
import { Todo, Todos } from "../../models/todo/todo";
import { ApiResponse, BaseRepository } from "../repository";

const dummyData: Todos = [
    {
        id: "1",
        title: "hello",
        contents: "world",
        isDone: false,
    },
    {
        id: "2",
        title: "hello2",
        contents: "world",
        isDone: false,
    },
];

class TodoService {
    private todoRepository: BaseRepository<Todo>;

    constructor(todoRepository: BaseRepository<Todo>) {
        this.todoRepository = todoRepository;
    }

    async getAllTodos(): Promise<ApiResponse<Todo[]>> {
        // return this.todoRepository.getMany("");

        // 더미 데이터
        return {
            data: dummyData,
            succeeded: true,
            errors: null,
        };
    }

    async getTodoById(todoId: string): Promise<ApiResponse<Todo>> {
        // return this.todoRepository.get(`${todoId}`);

        // 더미 데이터
        return {
            data: dummyData[0],
            succeeded: true,
            errors: null,
        };
    }

    async updateTodo(todoId: string): Promise<ApiResponse<Todo>> {
        return this.todoRepository.update(`${todoId}`);
    }
}

export const apiTodoService = new TodoService(new BaseRepository());

// const TodoContext = createContext( new TodoService(new BaseRepository()));

// export const TodoProvider = ({ children }: PropsWithChildren) => {
//     const todoService = new TodoService(new BaseRepository());

//     return <TodoContext.Provider value={todoService}>{children}</TodoContext.Provider>;
// };

// export const useArticleService = () => useContext(TodoContext);
