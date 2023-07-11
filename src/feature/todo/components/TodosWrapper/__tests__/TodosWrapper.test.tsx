import { render, act, queryHelpers } from '@testing-library/react'
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

const AppProviders: React.JSXElementConstructor<{children: React.ReactElement}> = ({ children }) => {
    const initialState: InitialStateType = ({set}: any) => {
        set(todoStore, children.props?.renderCallbackProps?.defaultState?.todoStore)
    };
    return <RecoilRoot initializeState={initialState}>
        {children}
    </RecoilRoot>
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

    it('Список задач отображается', async () => {
        mock.onGet(TODO_API).reply(200, [
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
        ]);
        // 1. Рендерим компонент фичи
        const { container } = await act(async () => await render(<TodosWrapper />, { wrapper: AppProviders }))

        // 2. Проверяем, что задачи отобразились на странице
        const inputSearch = queryHelpers.queryAllByAttribute('data-qa-type', container, 'todo-item') as HTMLInputElement[];
        expect(inputSearch.length).toBe(3);
        expect(mock.history.get[0].url).toEqual('/api');
    })
    // it('Пользователь отмечает задачу выполненной и она становится зачеркнутой', async () => {
    //     const { container } = await act(async () => await render(<TodosWrapper />, { wrapper: AppProviders }))
    //     const inputSearch = queryHelpers.queryAllByAttribute('data-qa-type', container, 'todo-item') as HTMLInputElement[];
    //     expect(inputSearch.length === 3).toBeTruthy();
    // })
})