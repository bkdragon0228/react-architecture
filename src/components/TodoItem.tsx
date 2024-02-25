import useTodoDetailViewModel from "../viewModels/useTodoDetailViewModel";

const TodoItem = ({ todoId }: { todoId: string }) => {
    const { todoDetail } = useTodoDetailViewModel(todoId);

    return (
        <>
            <h2>{todoDetail?.title}</h2>
            <span>{todoDetail?.contents}</span>
        </>
    );
};

export default TodoItem;
