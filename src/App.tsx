import React, { useCallback } from 'react';
import { TodoItem } from './feature/todo/components/TodoItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useTodoStore } from './feature/todo/store/todoStore';

function App() {
  const todos = useTodoStore.use.todos();
  const checkTodoItem = useTodoStore.use.checkTodoItem();
  const deleteTodoItem = useTodoStore.use.deleteTodoItem();

  // @ts-ignore
  const handleOnDragEnd = useCallback((result) => {
    console.log(result);
  }, []);

  const handleDragStart = useCallback(() => {
    console.log(1);
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  }, [])

  const handleDeleteTask = useCallback((id: string) => {
    deleteTodoItem(id);
  }, [deleteTodoItem]);

  const handleCheckTask = useCallback((id: string) => {
    checkTodoItem(id);
  }, [checkTodoItem]);

  return (
    <div className='container auto p-2'>
      <div className='text-lg'>Simple todo app</div>
      {/* Todo list */}
      <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={handleDragStart}>
        <Droppable droppableId='droppable-1'>
          {droppableProvider => (
            <div ref={droppableProvider.innerRef} className='flex flex-col gap-2 mt-3' {...droppableProvider.droppableProps}>
              {todos.map((task, index) => (
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
                        onDelete={handleDeleteTask}
                        onCheck={handleCheckTask}
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
    </div>
  );
}

export default App;
