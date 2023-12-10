// import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import * as reducerObj from "./modules";
console.log('reducerObj',reducerObj);

// import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

// 定义持久化配置
const persistConfig = {
  key: "root",
  storage,
  // stateReconciler: autoMergeLevel2
  // stateReconciler: hardSet,
  // whitelist: ['navigation']
  // blacklist: [],
};

//合并reducer
const reducer = combineReducers(reducerObj);

// 创建持久化reducer
const persistedReducer = persistReducer(persistConfig, reducer);

// 创建Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// const store = configureStore({
//   reducer: {
//     ...reducerObj,
//   },
// });

// 创建持久化存储器
export const persistor = persistStore(store);

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
