import { QueryClient, QueryClientProvider } from "react-query";
import { StoryObj, Meta } from "@storybook/react";
import { TodoFeature } from "./TodoFeature";

import { rest } from 'msw';
import { TODO_API } from "../services/constants";
import { RecoilRoot } from "recoil";

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
                return res(ctx.json([]));
            }),
        ],
    },
};