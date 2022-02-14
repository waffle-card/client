import { authApi } from '@apis';
import { userState } from '@recoil';
import { useSetRecoilState } from 'recoil';
import { TOKEN_NAME } from '@constants';

const useUser = () => {
  const serUser = useSetRecoilState(userState);

  const login = async (email, password) => {
    const response = await authApi.login({ email, password });
    const { token, id, name, email: userEmail } = response.data;

    sessionStorage.setItem(TOKEN_NAME, JSON.stringify(token));
    serUser({ id, name, email: userEmail });
  };

  const logout = () => {
    sessionStorage.removeItem(TOKEN_NAME);
    serUser(null);
  };

  const updateUser = async userInfo => {
    await authApi.updateUser({ ...userInfo });
  };

  return { login, logout, updateUser };
};

export default useUser;
