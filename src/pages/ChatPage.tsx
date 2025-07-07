import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import ChatBox from '../components/Chat/ChatBox';

const ChatPage: React.FC = () => {
  return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Welcome to the Chat Room!
          </Typography>
          <Box mt={2}>
            <ChatBox />
          </Box>
        </Paper>
      </Container>
  );
};

export default ChatPage;