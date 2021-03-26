import { SET_USER_INFO } from './types';
export const setUserInfo = (tokenValue, isLoggedInStatus) => ({
    type: SET_USER_INFO,
    payload: {
        token: tokenValue,
        isLoggedIn: isLoggedInStatus,
    },
});
