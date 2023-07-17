import { TODO_API } from "./constants";
import axios from 'axios';

export type TodoApiItemType = {
    id: string;
    title: string;
    category: string;
    priority: number;
    done: boolean;
}

export type TodoApiItemUpdateType = Pick<TodoApiItemType, 'title'>;

export type GetTodoApiResponseType = {
    todos: TodoApiItemType[];
}

export const getTodosApi = async () => {
    const result = await axios.get<GetTodoApiResponseType>(TODO_API);
    return result.data.todos;
}

export const createTodosApi = async (payload: TodoApiItemUpdateType) => {
    const result = await axios.post(TODO_API, { ...payload })
    return result.data;
}

export const deleteTodoApi = async (id: string) => {
    const result = await axios.post(`${TODO_API}/delete`, { id })
    return result.data;
}

export const checkTodoApi = async (id: string) => {
    const result = await axios.post<{todos: TodoApiItemType}>(`${TODO_API}/check`, { id })
    return result.data;
}

export const unCheckTodoApi = async (id: string) => {
    const result = await axios.post(`${TODO_API}/uncheck`, { id })
    return result.data;
}