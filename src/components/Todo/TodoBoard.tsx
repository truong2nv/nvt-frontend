import React from 'react';
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { Box } from '@mui/material';
import type { Todo, TodoStatus } from '../../types';
import TodoColumn from './TodoColumn';

interface TodoBoardProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const statuses: TodoStatus[] = ['WillDo', 'Active', 'Progress', 'Close'];

const TodoBoard: React.FC<TodoBoardProps> = ({ todos, setTodos }) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const todoId = active.id.toString();
    const newStatus = over.id as TodoStatus;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId ? { ...todo, status: newStatus } : todo
      )
    );
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        justifyContent="center"
        width="100%"
      >
        {statuses.map((status) => (
          <Box key={status} flex="1 1 250px" minWidth="250px" maxWidth="350px">
            <TodoColumn
              status={status}
              items={todos.filter((todo) => todo.status === status)}
            />
          </Box>
        ))}
      </Box>
    </DndContext>
  );
};

export default TodoBoard;