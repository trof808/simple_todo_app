import { QueryClient, QueryClientProvider } from "react-query";
import { render, act, queryHelpers, screen } from '@testing-library/react'
import { TodosWrapper } from '../TodosWrapper'
import { MutableSnapshot, RecoilRoot } from 'recoil';
import MockAdapter from "axios-mock-adapter";
import { TodoStoreType, todoStore } from '../../../store/todoStore';
import axios from 'axios';
import { TODO_API } from '../../../services/constants';

export const makeDelay =
    async (timeout = 0) =>
        async () =>
            new Promise((resolve) => setTimeout(resolve, timeout));

export type InitialStateType = (mutableSnapshot: MutableSnapshot) => void;

export type StoreType = {
    todoStore?: TodoStoreType | null;
}

export type DefaultProps = {
    defaultState: StoreType;
}

export const queryClient = new QueryClient();

const AppProviders: React.JSXElementConstructor<{ children: React.ReactElement }> = ({ children }) => {
    const initialState: InitialStateType = ({ set }: any) => {
        set(todoStore, children.props?.renderCallbackProps?.defaultState?.todoStore)
    };
    return <QueryClientProvider client={queryClient}>
        <RecoilRoot initializeState={initialState}>
            {children}
        </RecoilRoot>
    </QueryClientProvider>
}

// jest.mock('../../../services/getTodosApi', () => ({
//     __esModule: true,
//     getTodosApi: () => [
//         {
//             id: '1',
//             title: 'Проверить задачи в джире',
//             priority: 0,
//             category: 'работа',
//             done: false,
//         },
//         {
//             id: '2',
//             title: 'Написать Васе че там с API',
//             priority: 1,
//             category: 'работа',
//             done: false,
//         },
//         {
//             id: '3',
//             title: 'Собрать шкаф',
//             priority: 2,
//             category: 'дом',
//             done: false,
//         }
//     ],
// }));

describe('Тестирование фичи списка задач', () => {
    let mock: MockAdapter;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        jest.clearAllMocks();
        mock.reset();
    });

    // Рендерим фичу и проверяем весь флоу, от вызова апи до рендера
    // Без проверки вызова запроса и стора (только с моком и рендером) мы уже проверяем все то, что обычно проверяем UI тесте
    // Но также преимущество в том что мы можем легко докинуть проверок сюда например, что вызвался конкретный апи метод,
    // Что данные попали в стор, что вызвался определенный метод в коде, экшен и тд
    it('Список задач отображается', async () => {
        // 0. Мокируем апи
        mock.onGet(TODO_API).reply(200, {
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
            ]
        });
        // 1. Рендерим компонент фичи
        const { container } = await act(async () => await render(<TodosWrapper />, { wrapper: AppProviders }))

        // 2. Проверяем, что вызвался нужный нам метод
        expect(mock.history.get.some(method => method.url === TODO_API)).toBeTruthy();

        const inputSearch = queryHelpers.queryAllByAttribute('data-qa-type', container, 'todo-item') as HTMLInputElement[];
        const checkTasksInJiraTodoItem = screen.queryByText('Проверить задачи в джире')

        // 3. Проверяем, что задачи отобразились на странице
        expect(inputSearch.length).toBe(3);
        // 4. Проверяем по названию задачи, что она есть в DOM 
        expect(checkTasksInJiraTodoItem).toBeInTheDocument();
    })
    // it('Пользователь отмечает задачу выполненной и она становится зачеркнутой', async () => {
    //     const { container } = await act(async () => await render(<TodosWrapper />, { wrapper: AppProviders }))
    //     const inputSearch = queryHelpers.queryAllByAttribute('data-qa-type', container, 'todo-item') as HTMLInputElement[];
    //     expect(inputSearch.length === 3).toBeTruthy();
    // })
})