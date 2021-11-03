import { authApi } from '@apis';

export const validateEmailEmpty = email => {
  return email ? true : false;
};

export const validateEmailForm = email => {
  const regExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return regExp.test(email);
};

export const validateNameEmpty = name => {
  return name ? true : false;
};

export const validateNameLength = name => {
  return name.length <= 10 ? true : false;
};

export const validatePasswordEmpty = password => {
  return password ? true : false;
};

export const validatePasswordLength = password => {
  return password.length >= 8 ? true : false;
};

export const validatePasswordConfirm = (a, b) => {
  return a === b;
};

export const isLoggedIn = async () => {
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
