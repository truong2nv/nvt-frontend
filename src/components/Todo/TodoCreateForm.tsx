import React, { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';

interface Props {
  onSubmit: (title: string) => void;
  onClose?: () => void;
}

const CreateTodoForm: React.FC<Props> = ({ onSubmit, onClose }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit(title.trim());
    setTitle('');
    onClose?.(); // tự đóng nếu có truyền hàm đóng
  };

  return (
    <Stack spacing={2}>
      <TextField
        label="New todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <Button variant="contained" onClick={handleSubmit}>
        Add
      </Button>
    </Stack>
  );
};

export default CreateTodoForm;