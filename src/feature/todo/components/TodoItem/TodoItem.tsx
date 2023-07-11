import { BsTrash } from 'react-icons/bs'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { useCallback } from 'react';
import classNames from 'classnames';


type TodoItemProps = {
    id: string;
    title: string;
    priority: number;
    category: string;
    onCheck: (id: string) => void;
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
    done = false
}: TodoItemProps) => {

    const handleDelete = useCallback(() => {
        onDelete(id)
    }, [id, onDelete]);

    const handleCheck = useCallback(() => {
        onCheck(id)
    }, [id, onCheck]);

    return (
        <div
            className="flex items-center justify-between"
            data-qa-type='todo-item'
        >
            <div>
                <span className={classNames({ 'line-through': done })}>{title}</span>
                <div className='flex gap-2 text-slate-400 text-sm'>
                    {/* <span>#{category}</span> */}
                </div>
            </div>
            <div className='flex gap-2 text-xl cursor-pointer'>
                <AiOutlineCheckCircle onClick={handleCheck} />
                <BsTrash onClick={handleDelete} />
            </div>
        </div>

    )
}