// src/layout/MainLayout.tsx
import React from 'react';
import { Box } from '@mui/material';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          p: 2,
          width: '100%',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;