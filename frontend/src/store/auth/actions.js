import { SET_USER_INFO } from './types';
export const setUserInfo = (tokenValue, id, user) => ({
    type: SET_USER_INFO,
    payload: {
        token: tokenValue,
        id: id,
        user: user,
    },
});
