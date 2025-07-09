import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [localError, setLocalError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    try {
      const resultAction = await login(credentials.email, credentials.password);
      if (resultAction.type.endsWith('/rejected')) {
        setLocalError(
        (resultAction as any).payload ||
        (resultAction as any).error?.message ||
        'Invalid username or password'
      );
        return;
      }
      navigate('/');
    } catch (err: any) {
      setLocalError(
        err?.response?.data?.message ||
        err?.message ||
        'Invalid username or password'
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f2f5',
      }}
    >
      <Paper elevation={4} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h5" textAlign="center" mb={3}>
          Sign In
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={credentials.email}
            onChange={handleChange}
            autoComplete="email"
            disabled={loading}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={credentials.password}
            onChange={handleChange}
            autoComplete="current-password"
            disabled={loading}
          />
          {(localError || error) && (
            <Typography color="error" mt={1}>
              {localError || error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default SignInPage;