import React, { createContext, useContext, useReducer } from 'react';
import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';
import { authApi } from '@apis';
import Swal from 'sweetalert2';
import Common from '@styles';

const userReducer = (state, { type, payload }) => {
  switch (type) {
    case 'INIT_USER': {
      return payload;
    }
    case 'SET_USER':
      return {
        id: payload.username,
        userName: payload.username,
        email: payload.email,
      };
    case 'DELETE_USER':
      return null;
    default:
      console.error(`"${type}"액션이 정의되어있지 않습니다.`);
  }
};

const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children, initialUserInfo }) => {
  const [userInfo, dispatch] = useReducer(userReducer, initialUserInfo);

  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'INIT_USER', payload: initialUserInfo || {} });
  }, [initialUserInfo]);

  const handleLogin = useCallback(
    async ({ email, password }) => {
      try {
        const response = await authApi.login({ email, password });
        const userInfo = {
          userName: response.data.user.username,
          email: response.data.user.email,
        };
        sessionStorage.setItem(
          'WAFFLE_TOKEN',
          JSON.stringify(response.data.token),
        );
        dispatch({ type: 'SET_USER', payload: userInfo });
        Swal.fire({
          title: '🥳',
          text: '로그인 되었습니다!',
          confirmButtonColor: Common.colors.point,
        }).then(() => {
          history.push('/');
        });
      } catch (error) {
        Swal.fire({
          title: '🥲',
          text: '이메일과 비밀번호를 확인해주세요.',
          confirmButtonColor: Common.colors.point,
        });
      }
    },
    [history],
  );

  const handleLogout = useCallback(async () => {
    const response = await authApi.logout();
    console.log('response: ', response);
    Swal.fire({
      title: '👋🏻',
      text: '로그아웃되었습니다.',
      confirmButtonColor: Common.colors.point,
    });
    history.push('/');
    sessionStorage.removeItem('WAFFLE_TOKEN');
    dispatch({ type: 'DELETE_USER' });
  }, [history]);

  const handleUpdateUser = useCallback(async () => {
    try {
      const response = await authApi.getAuthUser();
      const userInfo = {
        userName: response.data.user.username,
        email: response.data.user.email,
      };
      dispatch({ type: 'SET_USER', payload: userInfo });
      return;
    } catch (error) {
      Swal.fire({
        title: '😂',
        text: '요청에 실패했습니다.',
        confirmButtonColor: Common.colors.point,
      });
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        userInfo,
        handleLogin,
        handleLogout,
        handleUpdateUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;