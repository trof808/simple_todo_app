import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { TodoItem } from '../TodoItem';
import { useCallback } from 'react';
import { TodoItemType } from '../../store/todoStore';

type TodoListProps = {
    todos: TodoItemType[]
    onCheckTodo: (id: string) => void;
    onUnCheckTodo: (id: string) => void;
    onDeleteTodo: (id: string) => void;
}

export const TodoList = ({
    todos,
    onCheckTodo,
    onDeleteTodo,
    onUnCheckTodo,
}: TodoListProps) => {
    // @ts-ignore
    const handleOnDragEnd = useCallback((result) => {
      console.log(result);
    }, []);
  
    const handleDragStart = useCallback(() => {
      if (window.navigator.vibrate) {
        window.navigator.vibrate(100);
      }
    }, [])
  
    return (
        <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={handleDragStart}>
            <Droppable droppableId='droppable-1'>
                {droppableProvider => (
                    <div ref={droppableProvider.innerRef} className='flex flex-col gap-2 mt-3' {...droppableProvider.droppableProps}>
                        {todos?.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                {provided => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <TodoItem
                                            id={task.id}
                                            key={task.id}
                                            title={task.title}
                                            priority={task.priority}
                                            category={task.category}
                                            onDelete={onDeleteTodo}
                                            onCheck={onCheckTodo}
                                            onUncheck={onUnCheckTodo}
                                            done={task.done}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {droppableProvider.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}