import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const NotFoundPage: React.FC = () => {
  return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
          NotFoundPage !!!!
          </Typography>
        </Paper>
      </Container>
  );
};

export default NotFoundPage;