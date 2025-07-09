import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CreateTodoForm from './TodoCreateForm';

type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: (title: string) => void;
}

const AddTodoModal = ({ open, onClose, onAdd } : Props) => (
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