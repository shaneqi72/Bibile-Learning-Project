import { SET_USER_INFO } from './types';

const INITIAL_STATE = {
    token: null,
    id: null,
    user: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
    // const { token, isLoggedIn } = action.payload;

    switch (action.type) {
        case SET_USER_INFO:
            return {
                ...state,
                token: action.payload.token,
                id: action.payload.id,
                user: action.payload.user,
            };

        default:
            return state;
    }
};

export default authReducer;
