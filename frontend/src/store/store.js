import { combineReducers, createStore } from 'redux';
import navReducer from './nav/reducer';

const allReducer = combineReducers({
    nav: navReducer,
});

const store = createStore(
    allReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export { store };
