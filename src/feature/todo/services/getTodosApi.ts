import { TODO_API } from "./constants";
import axios from 'axios';

export type TodoApiItemType = {
    id: string;
    title: string;
    category: string;
    priority: number;
    done: boolean;
}

export type GetTodoApiResponseType = {
    todos: TodoApiItemType[];
}

export const getTodosApi = async () => {
    const result = await axios.get<GetTodoApiResponseType>(TODO_API);
    return result.data.todos;
}