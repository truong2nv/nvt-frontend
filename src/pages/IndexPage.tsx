import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const IndexPage: React.FC = () => {
  return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Welcome to IndexPage!
          </Typography>
        </Paper>
      </Container>
  );
};

export default IndexPage;