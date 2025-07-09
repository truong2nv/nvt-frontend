import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignInPage from '../SignInPage';
import { useAuth } from '../../contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';

// Mock useAuth
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const mockLogin = jest.fn();

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe('SignInPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      loading: false,
      error: '',
    });
  });

  it('renders form fields', () => {
    renderWithRouter(<SignInPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows error if login is rejected', async () => {
    mockLogin.mockResolvedValueOnce({ type: 'auth/login/rejected', payload: 'Sai tài khoản hoặc mật khẩu' });
    renderWithRouter(<SignInPage />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/sai tài khoản hoặc mật khẩu/i)).toBeInTheDocument();
    });
  });

  it('calls login with correct credentials', async () => {
    mockLogin.mockResolvedValueOnce({ type: 'auth/login/fulfilled' });
    renderWithRouter(<SignInPage />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('user@example.com', '123456');
    });
  });

  it('disables button when loading', () => {
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      loading: true,
      error: '',
    });
    renderWithRouter(<SignInPage />);
    expect(screen.getByRole('button', { name: /logging in/i })).toBeDisabled();
  });

  it('shows error from context', () => {
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      loading: false,
      error: 'Server error',
    });
    renderWithRouter(<SignInPage />);
    expect(screen.getByText(/server error/i)).toBeInTheDocument();
  });
});