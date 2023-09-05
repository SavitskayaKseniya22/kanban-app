import React from 'react';
import {
  Route,
  Outlet,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './header/Header';
import Footer from './Footer';
import MainPage from '../pages/MainPage';
import { AuthForm } from './auth/AuthForm';
import { RootState } from '../store/store';
import BoardsList from '../pages/Boards/BoardsList';

function PrivateRoute() {
  const { activeUser } = useSelector((state: RootState) => state.persist.user);
  return !activeUser ? <Navigate to="/" /> : <Outlet />;
}

function PrivateAuthRoute() {
  const { activeUser } = useSelector((state: RootState) => state.persist.user);
  return activeUser ? <Navigate to="/board" /> : <Outlet />;
}

function PrivateProfileRoute() {
  const { activeUser } = useSelector((state: RootState) => state.persist.user);
  return !activeUser ? <Navigate to="/auth/login" /> : <Outlet />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement="<div>error</div>" id="root" element={<Outlet />}>
      <Route
        element={
          <>
            <Header />
            <Outlet />
            <Footer />
          </>
        }
      >
        <Route index element={<MainPage />} />
        <Route element={<PrivateAuthRoute />}>
          <Route path="auth" element={<Outlet />}>
            <Route index element={<Navigate to="login" />} />
            <Route path="login" element={<AuthForm formType="login" />} />
            <Route path="registration" element={<AuthForm formType="registration" />} />
          </Route>
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="boards" element={<Outlet />}>
            <Route index element={<BoardsList />} />
            <Route path=":id" element="<div>id</div>" />
          </Route>
        </Route>
        <Route element={<PrivateProfileRoute />}>
          <Route path="profile" element="<div>profile</div>" />
        </Route>
        <Route path="*" element="<div>404</div>" />
      </Route>
    </Route>
  )
);

export default router;
