import { BsTrash } from 'react-icons/bs'
import { AiOutlineCheckCircle, AiOutlineUndo } from 'react-icons/ai'
import { useCallback } from 'react';
import classNames from 'classnames';


type TodoItemProps = {
    id: string;
    title: string;
    priority: number;
    category: string;
    onCheck: (id: string) => void;
    onUncheck: (id: string) => void;
    onDelete: (id: string) => void;
    done?: boolean;
}

export const TodoItem = ({
    id,
    title,
    priority,
    // category,
    onCheck,
    onDelete,
    onUncheck,
    done = false
}: TodoItemProps) => {

    const handleDelete = useCallback(() => {
        onDelete(id)
    }, [id, onDelete]);

    const handleCheck = useCallback(() => {
        onCheck(id)
    }, [id, onCheck]);

    const handleUncheck = useCallback(() => {
        onUncheck(id);
    }, [id, onUncheck]);

    return (
        <div
            className="flex items-center justify-between"
            data-qa-type='todo-item'
        >
            <div className='w-max'>
                <span className={classNames({ 'line-through': done })}>{title}</span>
                <div className='flex gap-2 text-slate-400 text-sm'>
                    {/* <span>#{category}</span> */}
                </div>
            </div>
            <div className='flex gap-2 text-xl cursor-pointer'>
                {!done && <AiOutlineCheckCircle data-qa-type='check-btn' onClick={handleCheck} />}
                {done && <AiOutlineUndo data-qa-type='uncheck-btn' onClick={handleUncheck} />}
                <BsTrash data-qa-type='delete-btn' onClick={handleDelete} />
            </div>
        </div>

    )
}