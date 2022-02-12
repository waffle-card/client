import { atom, selector } from 'recoil';
import { authApi } from '@apis';
import { TOKEN_NAME } from '@constants';

export const userState = atom({
  key: 'user',
  default: selector({
    key: 'user/get',
    get: async ({ get }) => {
      const token = sessionStorage.getItem(TOKEN_NAME);
      if (!token) return null;

      try {
        const {
          data: { id, email, name },
        } = await authApi.me(token);

        return { id, email, name };
      } catch (error) {
        sessionStorage.removeItem(TOKEN_NAME);
        console.error(`in User Recoil: ${error.message}`);
      }
    },
  }),
});

// export const userSelector = selector({
//   key: 'user/get',
//   get: async ({ get }) => {
//     const userInfo = get(userState);
//     if (userInfo) return userInfo;

//     const token = sessionStorage.getItem(TOKEN_NAME);
//     if (!token) return null;

//     try {
//       const {
//         data: { id, email, name },
//       } = await authApi.me(token);

//       return { id, email, name };
//     } catch (error) {
//       sessionStorage.removeItem(TOKEN_NAME);
//       console.error(`in User Recoil: ${error.message}`);
//     }
//   },
//   set: ({ set }, newValue) => {
//     set(userState, newValue);
//   },
// });
