import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCallback } from 'react';
import { getUserInfoByToken } from '@utils';
import Swal from 'sweetalert2';
import Common from '@styles';

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  const updateUserInfo = useCallback(async () => {
    try {
      const userData = await getUserInfoByToken();
      setUserInfo(userData);
    } catch (error) {
      Swal.fire({
        title: '😂',
        text: '유저인증 요청에 실패했습니다.',
        confirmButtonColor: Common.colors.point,
      });
    }
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem('WAFFLE_TOKEN');
    if (token) {
      updateUserInfo();
    }
  }, [updateUserInfo]);

  const removeUserInfo = useCallback(() => {
    setUserInfo(null);
  }, []);

  return (
    <UserContext.Provider
      value={{
        userInfo,
        updateUserInfo,
        removeUserInfo,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
