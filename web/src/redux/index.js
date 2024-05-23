import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import alarm from "./reducers/comparison.js";
import UserInfo from "./reducers/userinfo.js";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['alarm'] // 查看 'Merge Process' 部分的具体情况
};
const combine = combineReducers({
  alarm,
  UserInfo
});

const myPersistReducer = persistReducer(persistConfig, combine)

const store = createStore(myPersistReducer,applyMiddleware(thunk))

export const persistor = persistStore(store)
export default store
// export const store = createStore(combine, applyMiddleware(thunk));
