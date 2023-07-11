import { useCallback } from "react"
import { todoStore } from "../store/todoStore";
import { getTodosApi } from "../services/getTodosApi";
import { useSetRecoilState } from "recoil";

export const useTodosActionsHook = () => {
    const setTodos = useSetRecoilState(todoStore);

    const getTodosAction = useCallback(async () => {
        const res = await getTodosApi()
        if (res)
            setTodos(res)
    }, [setTodos]);

    return { getTodosAction }
}