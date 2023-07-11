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

// checkTodoItem: (id) => set((state) => {
//     const todoItemById = state.todos.find(todo => todo.id === id);
//     if (!todoItemById) return { todos: state.todos };
//     return { todos: [...state.todos.filter(todo => todo.id !== id), { ...todoItemById, done: true }] }
// }),
// deleteTodoItem: (id) => set((state) => ({ todos: state.todos.filter((todo => todo.id !== id)) })),