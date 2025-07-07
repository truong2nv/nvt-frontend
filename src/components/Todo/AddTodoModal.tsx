import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CreateTodoForm from './TodoCreateForm';

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (title: string) => void;
}

const AddTodoModal: React.FC<Props> = ({ open, onClose, onAdd }) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
    <DialogTitle>
      Add New Todo
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{ position: 'absolute', right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent>
      <CreateTodoForm onSubmit={onAdd} onClose={onClose} />
    </DialogContent>
  </Dialog>
);

export default AddTodoModal;