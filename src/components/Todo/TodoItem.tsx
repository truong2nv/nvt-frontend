import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Card, CardContent, Typography } from '@mui/material';
import type { Todo } from '../../types';

interface Props {
  todo: Todo;
}

const TodoItem: React.FC<Props> = ({ todo }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: todo.id,
  });

  return (
    <Card
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      sx={{
        opacity: isDragging ? 0.5 : 1,
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
        transition: 'transform 200ms ease',
        cursor: 'grab',
      }}
    >
      <CardContent sx={{ p: 1 }}>
        <Typography variant="body2">{todo.title}</Typography>
      </CardContent>
    </Card>
  );
};

export default TodoItem;