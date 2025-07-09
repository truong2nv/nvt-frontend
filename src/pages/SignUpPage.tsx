import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, TextField, Button, Typography, Box, Paper
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

export default function SignUpPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', firstName:'', lastName: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await signup(form.email, form.password, form.firstName, form.lastName);
      navigate('/');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 10 }}>
        <Typography variant="h4" gutterBottom>Sign Up</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={handleChange}
          />
           <TextField
            label="First Name"
            name="firstName"
            fullWidth
            margin="normal"
            value={form.firstName}
            onChange={handleChange}
          />
          <TextField
            label="Last Name"
            name="lastName"
            fullWidth
            margin="normal"
            value={form.lastName}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={form.password}
            onChange={handleChange}
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            margin="normal"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign Up
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}