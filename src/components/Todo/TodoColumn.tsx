import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Paper, Typography, Box } from '@mui/material';
import type { Todo, TodoStatus } from '../../types';
import TodoItem from './TodoItem';

interface Props {
  status: TodoStatus;
  items: Todo[];
}

const TodoColumn: React.FC<Props> = ({ status, items }) => {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <Paper
      ref={setNodeRef}
      elevation={3}
      sx={{
        p: 2,
        minHeight: 400,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        {status}
      </Typography>
      <Box flex={1} display="flex" flexDirection="column" gap={1}>
        {items.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </Box>
    </Paper>
  );
};

export default TodoColumn;