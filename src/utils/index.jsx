import { authApi } from '@apis';

export const getUserInfoByToken = async () => {
  const response = await authApi.getAuthUser();
  if (!response.data) {
    return false;
  }
  if (response.data._id) {
    const userInfo = {
      id: response.data._id,
      userName: response.data.fullName,
      email: response.data.email,
    };
    return userInfo;
  }
};
