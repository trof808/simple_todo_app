import React from 'react';
import { TodosWrapper } from './feature/todo/components/TodosWrapper';

function App() {
  return (
    <div className='container auto p-2'>
      <div className='text-lg'>Simple todo app</div>
      <TodosWrapper />
    </div>
  );
}

export default App;
