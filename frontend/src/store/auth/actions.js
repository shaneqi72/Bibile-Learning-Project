import { SET_USER_INFO } from './types';
export const setUserInfo = (tokenValue) => ({
    type: SET_USER_INFO,
    payload: {
        token: tokenValue,
    },
});
