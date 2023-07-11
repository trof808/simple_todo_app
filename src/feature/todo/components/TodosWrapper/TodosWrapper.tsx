import { useEffect } from "react";
import { useTodosActionsHook } from "../../hooks/useTodosActionsHook";
import { TodoList } from "../TodoList";
import { TodoForm } from '../TodoForm';
import { useRecoilValue } from "recoil";
import { sortedTodosSelector } from "../../store/todoSelectors";

export const TodosWrapper = () => {
    const sortedTodos = useRecoilValue(sortedTodosSelector)
    const { getTodosAction, createTodoAction, checkTodoAction, unCheckTodoAction, deleteTodoAction, todos, isCreateSuccess } = useTodosActionsHook();

    useEffect(() => {
        getTodosAction();
    }, [getTodosAction]);

    return <div>
        <div className="flex gap-2">
            <span className='text-lg font-bold'>Simple Todo App</span>
        </div>
        <TodoForm onSubmit={createTodoAction} isSubmitSuccess={isCreateSuccess} />
        <TodoList todos={sortedTodos} onCheckTodo={checkTodoAction} onUnCheckTodo={unCheckTodoAction} onDeleteTodo={deleteTodoAction} />
    </div>
}