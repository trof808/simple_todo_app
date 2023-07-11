import { useEffect } from "react";
import { useTodosActionsHook } from "../../hooks/useTodosActionsHook";
import { TodoList } from "../TodoList";

export const TodosWrapper = () => {
    const { getTodosAction, todos } = useTodosActionsHook();

    useEffect(() => {
        getTodosAction();
    }, [getTodosAction]);

    return <TodoList todos={todos} onCheckTodo={() => {}} onDeleteTodo={() => {}} />
}