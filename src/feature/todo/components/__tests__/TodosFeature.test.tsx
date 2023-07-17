import { QueryClient, QueryClientProvider } from "react-query";
import { render, act, queryHelpers, screen, fireEvent } from '@testing-library/react'
import { MutableSnapshot, RecoilRoot, snapshot_UNSTABLE } from 'recoil';
import MockAdapter from "axios-mock-adapter";
import { TodoStoreType, todoStore } from '../../store/todoStore';
import axios from 'axios';
import { TODO_API } from '../../services/constants';
import { TodoFeature } from "../TodoFeature";
import { TASK_MOCK_1_NOT_DONE, TODO_TASKS } from "../__mocks__/todoMocks";

export type InitialStateType = (mutableSnapshot: MutableSnapshot) => void;

export type StoreType = {
    todoStore?: TodoStoreType | null;
}

export type DefaultProps = {
    defaultState: StoreType;
}

export const queryClient = new QueryClient();

const AppProviders: React.JSXElementConstructor<{ children: React.ReactElement, store?: StoreType }> = ({ children, store }) => {
    const initialState: InitialStateType = ({ set }: any) => {
        set(todoStore, store?.todoStore)
    };
    return <QueryClientProvider client={queryClient}>
        <RecoilRoot initializeState={initialState}>
            {children}
        </RecoilRoot>
    </QueryClientProvider>
}

const customRender = (ui: React.ReactElement, options: { wrapperProps: { store: StoreType } }) =>
    render(ui, { wrapper: props => <AppProviders {...props} {...options.wrapperProps} />, ...options })

jest.useFakeTimers()
describe('Тестирование фичи списка задач', () => {
    let mock: MockAdapter;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        jest.clearAllMocks();
        mock.reset();
        mock.resetHistory();
    });

    // Рендерим фичу и проверяем весь флоу, от вызова апи до рендера
    // Без проверки вызова запроса и стора (только с моком и рендером) мы уже проверяем все то, что обычно проверяем UI тесте
    // Но также преимущество в том что мы можем легко докинуть проверок сюда например, что вызвался конкретный апи метод,
    // Что данные попали в стор, что вызвался определенный метод в коде, экшен и тд
    it('Отображаем фичу и проверяем, что список задач рендерится', async () => {
        // 0. Мокируем апи
        mock.onGet(TODO_API).reply(200, {
            todos: [TASK_MOCK_1_NOT_DONE]
        });
        // 1. Рендерим компонент фичи
        const { container } = await act(async () => await render(<TodoFeature />, { wrapper: AppProviders }))

        // 2. Проверяем, что вызвался нужный нам метод
        expect(mock.history.get.some(method => method.url === TODO_API)).toBeTruthy();

        const todoListContainer = queryHelpers.queryAllByAttribute('data-qa-type', container, 'todo-item') as HTMLInputElement[];
        const checkBtn = queryHelpers.queryByAttribute('data-qa-type', todoListContainer[0], 'check-btn') as HTMLInputElement;
        const unCheckBtn = queryHelpers.queryByAttribute('data-qa-type', todoListContainer[0], 'uncheck-btn') as HTMLInputElement;
        const checkTasksInJiraTodoItem = screen.queryByText('Проверить задачи в джире')

        // 3. Проверяем, что задачи отобразились на странице
        expect(todoListContainer.length).toBe(1);
        expect(checkTasksInJiraTodoItem).toBeInTheDocument();
        expect(checkBtn).toBeInTheDocument();
        expect(unCheckBtn).not.toBeInTheDocument();
    })
    it('Пользователь отмечает задачу выполненной', async () => {
        // 1. Рендерим компонент фичи с замоканным стором


        const { container } = await act(async () => await customRender(<TodoFeature />, { wrapperProps: { store: { todoStore: TODO_TASKS } } }))

        const todoListContainer = queryHelpers.queryAllByAttribute('data-qa-type', container, 'todo-item') as HTMLInputElement[];

        // 3. Проверяем, что задачи отобразились на странице
        expect(todoListContainer.length).toBe(3);

        // 4. Мокируем ответ
        mock.onGet(TODO_API).reply(200, {
            todos: TODO_TASKS
        });
        const checkSpy = jest.fn();
        mock.onPost(`${TODO_API}/check`).replyOnce((request) => {
            checkSpy(request.data);
            return [200, {}]
        });

        const firstTodoItemCheckBtn = queryHelpers.queryByAttribute('data-qa-type', todoListContainer[0], 'check-btn') as HTMLInputElement;
        await act(async () => {
            fireEvent.click(firstTodoItemCheckBtn)
        });
        
        expect(mock.history.get.length).toBe(1);
        expect(checkSpy).toHaveBeenCalledWith(JSON.stringify({ id:"1" }));
    })
})