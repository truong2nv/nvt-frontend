import { useState } from 'react';
import {
  Box, List, ListItem, IconButton, TextField, Checkbox, Typography, Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Todo {
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (index: number) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const deleteTodo = (index: number) => {
    const updated = [...todos];
    updated.splice(index, 1);
    setTodos(updated);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>Todso List</Typography>
      <Box display="flex" mb={2}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="New task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
      </Box>
      <List>
        {todos.map((todo, i) => (
          <ListItem key={i} sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox checked={todo.completed} onChange={() => toggleTodo(i)} />
            <Typography
              sx={{ flex: 1, textDecoration: todo.completed ? 'line-through' : 'none' }}
            >
              {todo.text}
            </Typography>
            <IconButton onClick={() => deleteTodo(i)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}