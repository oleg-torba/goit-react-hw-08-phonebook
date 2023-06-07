import { UserMenu } from './UserMenu/UserMenu';
import { ContactList } from './ContactList/ContactList';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import AuthNav from './UserMenu/AuthNav';
import { RegisterForm } from './UserForms/RegistrationForm';
import { LoginForm } from './UserForms/LoginForm';
import { useSelector } from 'react-redux';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { getCurrentUserAction } from 'redux/Authorization/AuthorizationAPI';
import { PrivateRoute } from './Routes/PrivateRoutes';
import { useFetchCurrentUserQuery } from 'redux/Authorization/AuthorizationAPI';
import PublicRoute from './Routes/PublicRoutes';

export function App() {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const { data: result, isSuccess } = useFetchCurrentUserQuery(
    token ? token : skipToken
  );
  useEffect(() => {
    if (isSuccess) dispatch(getCurrentUserAction(result));
  }, [isSuccess, result, dispatch]);
  console.log(useFetchCurrentUserQuery());
  console.log(useSelector(state => state));

  return (
    <Routes>
      <Route path="/" element={<AuthNav />}>
        <Route
          path="register"
          element={
            <PublicRoute restricted>
              <RegisterForm />
            </PublicRoute>
          }
        />
        <Route
          path="login"
          element={
            <PublicRoute restricted>
              <LoginForm />
            </PublicRoute>
          }
        />
        <Route
          path="logout"
          element={
            <PrivateRoute>
              <UserMenu />
            </PrivateRoute>
          }
        />

        <Route
          path="contacts"
          element={
            <PrivateRoute>
              <ContactList />
            </PrivateRoute>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
