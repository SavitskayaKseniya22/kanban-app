import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/es/storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import userReducer from './auth/authSlice';
import kanbanReducer from './kanban/kanbanSlice';
import { authApi } from './auth/authApi';
import { kanbanApi } from './kanban/kanbanApi';

const persistConfig = {
  key: 'remember-moments-app-root',
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: userReducer,
    kanban: kanbanReducer,
  })
);

const rootReducer = combineReducers({
  persist: persistedReducer,
  [authApi.reducerPath]: authApi.reducer,
  [kanbanApi.reducerPath]: kanbanApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(authApi.middleware)
      .concat(kanbanApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
