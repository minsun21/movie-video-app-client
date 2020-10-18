import { combineReducers } from 'redux';
import user from './user_reducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
    key: "root",
    storage
};

const rootReducer = combineReducers({
    user
});

export default persistReducer(persistConfig, rootReducer);