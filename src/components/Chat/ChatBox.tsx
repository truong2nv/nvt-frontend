import { useState } from 'react';
import { Box, Typography, TextField, IconButton, List, ListItem, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface Message {
  text: string;
  sender: string;
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'You' }]);
      setInput('');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>Chat</Typography>
      <List sx={{ maxHeight: 300, overflowY: 'auto', mb: 2 }}>
        {messages.map((msg, i) => (
          <ListItem key={i} sx={{ display: 'flex', justifyContent: msg.sender === 'You' ? 'flex-end' : 'flex-start' }}>
            <Box bgcolor="#e0e0e0" px={2} py={1} borderRadius={2}>
              <Typography variant="body1">{msg.text}</Typography>
            </Box>
          </ListItem>
        ))}
      </List>
      <Box display="flex">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <IconButton color="primary" onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}