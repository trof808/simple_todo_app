import { selector } from "recoil";
import { todoStore } from "./todoStore";

export const sortedTodosSelector = selector({
    key: 'sortedTodos',
    get: ({ get }) => {
        const todos = get(todoStore);
        console.log(todos);
        return todos ? [...todos].sort((a, b) => (a.done === b.done) ? 0 : a.done ? 1 : -1) : []
    }
})