import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(credentials.email, credentials.password);
      navigate('/');
    } catch (err) {
        console.log('Login error:', err);
      setError('Invalid username or password');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh', // Dùng 100vh để đảm bảo full màn hình trình duyệt
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
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={credentials.password}
            onChange={handleChange}
          />
          {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default SignInPage;