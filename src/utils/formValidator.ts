export const validateEmailEmpty = (email: string) => {
  return email ? true : false;
};

export const validateEmailForm = (email: string) => {
  const regExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return regExp.test(email);
};

export const validateNameEmpty = (name: string) => {
  return name ? true : false;
};

export const validateNameLength = (name: string) => {
  return name.length <= 10 ? true : false;
};

export const validatePasswordEmpty = (password: string) => {
  return password ? true : false;
};

export const validatePasswordLength = (password: string) => {
  return password.length >= 8 ? true : false;
};

export const validatePasswordConfirm = (a: string, b: string) => {
  return a === b;
};
