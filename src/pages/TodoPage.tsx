import TodoItem from "../components/TodoItem";
import useTodoListViewModel from "../viewModels/useTodoListViewModel";

const TodoPage = () => {
    const { data: todos } = useTodoListViewModel();

    console.log(todos, "todos");
    return (
        <>
            <h2>할일 목록</h2>
            <div>
                {todos?.map((todo) => (
                    <TodoItem key={todo.id} todoId={todo.id} />
                ))}
            </div>
        </>
    );
};
export default TodoPage;
