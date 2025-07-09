import React, { useState } from 'react';
import { Button, Container, Typography } from '@mui/material';
import TodoBoard from '../components/Todo/TodoBoard';
import type { Todo } from '../types';
import AddTodoModal from '../components/Todo/AddTodoModal';

const initialTodos: Todo[] = [
  { id: '1', title: 'Learn React', status: 'WillDo' },
  { id: '2', title: 'Build Todo App', status: 'Active' },
  { id: '3', title: 'Test Drag & Drop', status: 'Progress' },
  { id: '4', title: 'Deploy App', status: 'Close' },
];

const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [modalOpen, setModalOpen] = useState(false);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: (Math.random() * 100000).toFixed(0),
      title,
      status: 'WillDo',
    };
    setTodos([...todos, newTodo]);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        My Todo Listsss
      </Typography>
      <Button variant="contained" onClick={() => setModalOpen(true)}>
        Add Todo -------   ddf
      </Button>
      <AddTodoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={addTodo}
      />
      <TodoBoard todos={todos} setTodos={setTodos} />
    </Container>
  );
};

export default TodoPage;