import { useCallback, useEffect } from "react"
import { todoStore } from "../store/todoStore";
import { TodoApiItemUpdateType, checkTodoApi, createTodosApi, deleteTodoApi, getTodosApi, unCheckTodoApi } from "../services/todosApi";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useMutation, useQuery } from "react-query";

export const useTodosActionsHook = () => {
    const todos = useRecoilValue(todoStore);
    const setTodos = useSetRecoilState(todoStore);

    const { refetch: getTodosAction, data: todoResponse, isLoading, isError } = useQuery('getTodos', getTodosApi);
    const { mutate: createTodoMutation, isSuccess: isCreateSuccess } = useMutation(createTodosApi);
    const { mutate: deleteTodoMutation } = useMutation(deleteTodoApi);
    const { mutate: checkTodoMutation } = useMutation(checkTodoApi);
    const { mutate: uncheckTodoMutation } = useMutation(unCheckTodoApi);

    useEffect(() => {
        if (todoResponse && !isLoading && !isError)
            setTodos(todoResponse);
    }, [todoResponse, setTodos, isError, isLoading]);

    const createTodoAction = useCallback((payload: TodoApiItemUpdateType) => {
        createTodoMutation(payload, {
            onSuccess: () => {
                getTodosAction()
            }
        })
    }, [getTodosAction, createTodoMutation])

    const deleteTodoAction = useCallback((id: string) => {
        deleteTodoMutation(id, {
            onSuccess: () => {
                getTodosAction();
            }
        });
    }, [getTodosAction, deleteTodoMutation])

    const checkTodoAction = useCallback((id: string) => {
        checkTodoMutation(id, {
            onSuccess: () => {
                getTodosAction();
            }
        });
    }, [getTodosAction, checkTodoMutation])

    const unCheckTodoAction = useCallback((id: string) => {
        uncheckTodoMutation(id, {
            onSuccess: () => {
                getTodosAction();
            }
        });
    }, [getTodosAction, uncheckTodoMutation])

    return { getTodosAction, createTodoAction, deleteTodoAction, checkTodoAction, unCheckTodoAction, isCreateSuccess, todos }
}