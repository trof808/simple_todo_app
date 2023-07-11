import { TODO_API } from "./constants";
import axios from 'axios';

export type TodoApiType = {
    id: string;
    title: string;
    category: string;
    priority: number;
    done: boolean;
}

export const getTodosApi = async () => {
    const result = await axios.get<TodoApiType[]>(TODO_API);
    return result.data;
    // return Promise.resolve([
    //     {
    //         id: '1',
    //         title: 'Проверить задачи в джире',
    //         priority: 0,
    //         category: 'работа',
    //         done: false,
    //     },
    //     {
    //         id: '2',
    //         title: 'Написать Васе че там с API',
    //         priority: 1,
    //         category: 'работа',
    //         done: false,
    //     },
    //     {
    //         id: '3',
    //         title: 'Собрать шкаф',
    //         priority: 2,
    //         category: 'дом',
    //         done: false,
    //     }
    // ])
}