import { createSlice } from '@reduxjs/toolkit';

import { authApi } from './AuthorizationAPI';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  
};
console.log(initialState)
export const authSlice = createSlice({
  name: 'auth',
  initialState,

  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.registerUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = false;
      }
    );
    builder.addMatcher(
      authApi.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
      }
    );
    builder.addMatcher(
      authApi.endpoints.logoutUser.matchFulfilled,
      (state, _) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      }
    );
    builder.addMatcher(
      authApi.endpoints.fetchCurrentUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        state.isLoggedIn = true;
      }
    );
  },
});

// export const authApi = CreateApi({
//     baseQuery: fetchBaseQuery({
//       baseUrl: 'https://connections-api.herokuapp.com/',
//       prepareHeaders: (headers, { getState }) => {
//         // By default, if we have a token in the store, let's use that for authenticated requests
//         const token = getState().auth.token
//         if (token) {
//           headers.set('authorization', `Bearer ${token}`)
//         }
//         return headers
//       },
//     }),
//     endpoints: (builder) => ({
//       login: builder.mutation({
//         query: (credentials) => ({
//           url: 'users/login',
//           method: 'POST',
//           body: credentials,
//         }),
//       }),
//       signup: builder.mutation({
//         query: (credentials) => ({
//           url: 'users/signup',
//           method: 'POST',
//           body: credentials,
//         }),
//       }),
//       protected: builder.mutation({
//         query: () => 'protected',
//       }),
//     }),
//   })
  