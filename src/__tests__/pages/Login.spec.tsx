import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import LogIn from '../../pages/LogIn';
import { useAuth } from '../../hooks/Auth';

const mockedHistoryPush = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/Auth', () => {
  return {
    useAuth: () => ({
      logIn: jest.fn(),
    }),
  };
});

jest.mock('../../hooks/Toast', () => {
  return {
    useToast: () => ({
      addToast: jest.fn(),
    }),
  };
});

describe('LogIn Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to login', async () => {
    const { getByPlaceholderText, getByText } = render(<LogIn />);

    const userField = getByPlaceholderText('Usuário');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(userField, { target: { value: 'admin' } });
    fireEvent.change(passwordField, { target: { value: 'admin' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/leiloes');
    });
  });

  it('should not be able to login with invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<LogIn />);

    const userField = getByPlaceholderText('Usuário');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(userField, { target: { value: 'desativado' } });
    fireEvent.change(passwordField, { target: { value: 'desativado' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });
});
