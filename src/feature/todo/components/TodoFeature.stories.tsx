import { QueryClient, QueryClientProvider } from "react-query";
import { StoryObj, Meta } from "@storybook/react";
import { TodoFeature } from "./TodoFeature";

import { rest } from 'msw';
import { TODO_API } from "../services/constants";
import { RecoilRoot } from "recoil";
import { TASK_MOCK_4_DONE, TODO_TASKS } from "./__mocks__/todoMocks";

const queryClient = new QueryClient();

const meta: Meta<typeof TodoFeature> = {
    component: TodoFeature,
    decorators: [
        (Story) => (
            <QueryClientProvider client={queryClient}>
                <RecoilRoot>
                    <Story />
                </RecoilRoot>
            </QueryClientProvider>
        )
    ]
};

export default meta;
type Story = StoryObj<typeof TodoFeature>;

export const EmptyTodoList: Story = {
    parameters: {
        msw: [
            rest.get(TODO_API, (_req, res, ctx) => {
                return res(ctx.json({ todos: [] }));
            }),
        ],
        viewport: {
            defaultViewport: 'mobile2',
        },
    },
};

export const TodoListWithTasks: Story = {
    parameters: {
        msw: {
            handlers: [
                rest.get(TODO_API, (_req, res, ctx) => {
                    return res(ctx.json({ todos: TODO_TASKS }));
                }),
            ]
        },
        viewport: {
            defaultViewport: 'mobile2',
        },
    },
}

export const TodoListWithDoneTask: Story = {
    parameters: {
        msw: {
            handlers: [
                rest.get(TODO_API, (_req, res, ctx) => {
                    return res(ctx.json({ todos: [...TODO_TASKS, TASK_MOCK_4_DONE] }));
                }),
            ]
        },
        viewport: {
            defaultViewport: 'mobile2',
        },
    },
}