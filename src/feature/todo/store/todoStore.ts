import { create } from 'zustand'
import { createSelectors } from '../../../shared/store/createSelectors'

type TodoItemType = {
    id: string;
    title: string;
    category: string;
    priority: number;
    done: boolean;
}

type TodoState = {
    todos: TodoItemType[];
}

type TodoActions = {
    updateTodos: (todos: TodoState['todos']) => void,
    checkTodoItem: (id: string) => void,
    deleteTodoItem: (id: string) => void,
}

const todoStore = create<TodoState & TodoActions>((set) => ({
    todos: [
        {
            id: '1',
            title: 'Проверить задачи в джире',
            priority: 0,
            category: 'работа',
            done: false,
        },
        {
            id: '2',
            title: 'Написать Васе че там с API',
            priority: 1,
            category: 'работа',
            done: false,
        },
        {
            id: '3',
            title: 'Собрать шкаф',
            priority: 2,
            category: 'дом',
            done: false,
        }
    ],
    updateTodos: (todos) => set(() => ({ todos })),
    checkTodoItem: (id) => set((state) => ({ todos: state.todos.map((todo => ({ ...todo, done: todo.id === id }))) })),
    deleteTodoItem: (id) => set((state) => ({ todos: state.todos.filter((todo => todo.id !== id)) })),
}))

export const useTodoStore = createSelectors(todoStore)