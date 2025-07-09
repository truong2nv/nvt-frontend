import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import { setAxiosLogout, setAxiosLoadingHandlers } from './api/axiosClient';
import ChatPage from './pages/ChatPage';
import TodoPage from './pages/TodoPage';
import IndexPage from './pages/IndexPage';
import NotFoundPage from './pages/NotFoundPage';
import MainLayout from './layouts/MainLayout';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function LogoutHandler() {
  const { logout } = useAuth();

  React.useEffect(() => {
    setAxiosLogout(() => logout);
  }, [logout]);

  return null;
}

export default function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAxiosLoadingHandlers(
      () => setLoading(true),
      () => setLoading(false)
    );
  }, []);

  return (
    <AuthProvider>
      <LogoutHandler />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 9999 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Routes>
        {/* Public routes */}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Route / không cần bảo vệ, vẫn dùng layout */}
        <Route element={<MainLayout />}>
          <Route index element={<IndexPage />} />

          {/* Các route cần bảo vệ */}
          <Route
            element={
              <PrivateRoute>
                <Outlet />
              </PrivateRoute>
            }
          >
            <Route path="chat" element={<ChatPage />} />
            <Route path="todo" element={<TodoPage />} />
          </Route>

          {/* Catch-all not found */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}