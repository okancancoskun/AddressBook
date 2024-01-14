import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth.store";
import addressReducer from "./address.store";

const rootReducer = combineReducers({
  auth: authReducer,
  address: addressReducer,
});
// Persisted reducer oluşturun
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({ reducer: persistedReducer });

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
