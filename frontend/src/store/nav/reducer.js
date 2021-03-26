import { TOGGLE_NAV_DRAWER } from './types';

const INITIAL_STATE = {
    drawerOpen: false,
};

const navReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_NAV_DRAWER:
            return {
                ...state,
                drawerOpen: !state.drawerOpen,
            };
        default:
            return state;
    }
};

export default navReducer;
