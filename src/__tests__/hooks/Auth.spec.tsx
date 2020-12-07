import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { useAuth, AuthProvider } from '../../hooks/Auth';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
  it('should be able to login', async () => {
    apiMock.onPost('login').reply(200, {
      id: '1',
      name: 'Marian Bergnaum',
      token: '123123',
    });

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.logIn({
      user: 'admin',
      password: 'admin',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith('@Leiloes:token', '123123');
    expect(setItemSpy).toHaveBeenCalledWith(
      '@Leiloes:userName',
      'Marian Bergnaum',
    );
    expect(result.current.user).toContain('Marian Bergnaum');
  });
});
