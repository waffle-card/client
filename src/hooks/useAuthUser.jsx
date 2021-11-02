import { useEffect, useState } from 'react';
import { authApi } from '@apis';

const useAuthUser = ({ handleLoggedIn = {}, handleLoggedOut = {} }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      setIsLoading(true);
      const response = await authApi.getAuthUser();
      if (!response.data) {
        const userInfo = {
          id: response.data._id,
          userName: response.data.fullName,
          email: response.data.email,
        };
        handleLoggedIn(userInfo);
        setIsLoading(false);
        return;
      }
      if (response.data._id) {
        handleLoggedOut();
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
    };
    getUserInfo();
  }, [handleLoggedIn, handleLoggedOut]);

  return [isLoading];
};

export default useAuthUser;
