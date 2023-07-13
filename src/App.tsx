import React from 'react';
import { TodoFeature } from './feature/todo/components/TodoFeature';

function App() {
  return (
    <div className='container auto p-2'>
      <div className="flex gap-2">
        <span className='text-xl font-bold'>Simple Todo App</span>
      </div>
      <TodoFeature />
    </div>
  );
}

export default App;
