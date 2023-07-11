import { ChangeEventHandler, KeyboardEventHandler, useCallback, useEffect, useState } from "react"
import { TodoApiItemUpdateType } from "../../services/todosApi";

export type TodoFormProps = {
    onSubmit: (payload: TodoApiItemUpdateType) => void;
    isSubmitSuccess: boolean;
}

export const TodoForm = ({ onSubmit, isSubmitSuccess }: TodoFormProps) => {
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (isSubmitSuccess)
            setTitle('');
    }, [isSubmitSuccess]);

    const handleChangeTitle = useCallback<ChangeEventHandler>((e) => {
        //@ts-ignore
        setTitle(e.currentTarget.value);
    }, []);

    const handleFormSubmit = useCallback<KeyboardEventHandler>((e) => {
        if (e.key === 'Enter') {
            onSubmit({ title });
        }
    }, [title, onSubmit]);

    return <div className="flex mt-3 items-center">
        <input type="text" placeholder="Что сделать?" className="outline-none w-[100%]" value={title} onChange={handleChangeTitle} onKeyDown={handleFormSubmit} />
    </div>
}