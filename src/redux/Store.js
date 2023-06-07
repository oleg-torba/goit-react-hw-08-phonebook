import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { filterSlice } from './FilterSlice';
import { authApi, authSlice } from './Authorization/AuthorizationAPI';
import storage from 'redux-persist/lib/storage';

import { ContactsApi } from './ContactsSlice';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
const persistConfig = {
  key: 'authoriztaion',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authSlice.reducer),
    [authApi.reducerPath]: authApi.reducer,
    [ContactsApi.reducerPath]: ContactsApi.reducer,
    filter: filterSlice.reducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    authApi.middleware,
    ContactsApi.middleware,
  ],
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
