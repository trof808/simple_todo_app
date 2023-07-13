import { useTodosActionsHook } from "../hooks/useTodosActionsHook";
import { TodoForm } from "./TodoForm";
import { TodosWrapper } from "./TodosWrapper";

export const TodoFeature = () => {
    const { createTodoAction, isCreateSuccess } = useTodosActionsHook();

    return <div>
        <TodoForm onSubmit={createTodoAction} isSubmitSuccess={isCreateSuccess} />
        <TodosWrapper />
    </div>
}