import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCallback } from 'react';
import { newAuthApi } from '@apis';

const TOKEN_NAME = 'WAFFLE_TOKEN';

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  const login = async (email, password) => {
    const response = await newAuthApi.login({ email, password });
    const { token, id, name, email: userEmail } = response.data;

    sessionStorage.setItem(TOKEN_NAME, JSON.stringify(token));
    setUserInfo(() => ({ id, name, email: userEmail }));
  };

  const logout = () => {
    removeUserInfo();
  };

  const updateUserByToken = useCallback(async token => {
    try {
      const response = await newAuthApi.me(token);
      const { id, email, name } = response.data;

      setUserInfo({ id, email, name });
    } catch (error) {
      sessionStorage.getItem(TOKEN_NAME);
      console.error(`User Context: ${error.message}`);
    }
  }, []);

  const updateUserInfo = userInfo => {
    setUserInfo(() => userInfo);
  };

  const removeUserInfo = () => {
    sessionStorage.removeItem(TOKEN_NAME);
    setUserInfo(null);
  };

  useEffect(() => {
    const token = sessionStorage.getItem(TOKEN_NAME);
    token && updateUserByToken(token);
  }, [updateUserByToken]);

  // TODO(윤호): userProvider 관련 테스트 완료시 삭제하기
  useEffect(() => {
    console.log('in UserProvider, user info Change!', userInfo);
  }, [userInfo]);

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
        updateUserByToken,
        updateUserInfo,
        removeUserInfo,
        login,
        logout,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
