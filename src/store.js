import { applyMiddleware, compose, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import rootReducer from './reducers/';

const middlewares = [promiseMiddleware, ReduxThunk];

export const store = createStore(rootReducer, compose(applyMiddleware(...middlewares), window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()));

export const persistor = persistStore(store);

export default { store, persistor };