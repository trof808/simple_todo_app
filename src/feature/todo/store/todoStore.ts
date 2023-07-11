import { atom } from 'recoil';

export type TodoItemType = {
    id: string;
    title: string;
    category: string;
    priority: number;
    done: boolean;
}

export type TodoStoreType = TodoItemType[];

export const todoStore = atom<TodoStoreType>({
    key: 'todos',
    default: [],
})