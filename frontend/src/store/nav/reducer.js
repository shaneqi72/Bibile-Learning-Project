import { TOGGLE_NAV_DRAWER } from './types';

const INITIAL_STATE = {
    drawerOpen: false,
};

export default (state = INITIAL_STATE, action) => {
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
