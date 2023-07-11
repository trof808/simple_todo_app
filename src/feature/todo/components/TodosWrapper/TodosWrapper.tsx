import { useEffect } from "react";
import { useTodosActionsHook } from "../../hooks/useTodosActionsHook";
import { TodoList } from "../TodoList";
import { useRecoilValue } from "recoil";
import { todoStore } from "../../store/todoStore";

export const TodosWrapper = () => {
    const todos = useRecoilValue(todoStore);

    const { getTodosAction } = useTodosActionsHook();

    useEffect(() => {
        getTodosAction();
    }, [getTodosAction]);

    return <TodoList todos={todos} onCheckTodo={() => {}} onDeleteTodo={() => {}} />
}