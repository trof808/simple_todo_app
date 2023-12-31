import { useEffect } from "react";
import { useTodosActionsHook } from "../../hooks/useTodosActionsHook";
import { TodoList } from "../TodoList";
import { useRecoilValue } from "recoil";
import { sortedTodosSelector } from "../../store/todoSelectors";

export const TodosWrapper = () => {
    const sortedTodos = useRecoilValue(sortedTodosSelector)
    const { getTodosAction, checkTodoAction, unCheckTodoAction, deleteTodoAction } = useTodosActionsHook();

    useEffect(() => {
        getTodosAction();
    }, []);

    return <div>
        <TodoList todos={sortedTodos} onCheckTodo={checkTodoAction} onUnCheckTodo={unCheckTodoAction} onDeleteTodo={deleteTodoAction} />
    </div>
}