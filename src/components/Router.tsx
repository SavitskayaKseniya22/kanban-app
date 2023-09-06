import React from 'react';
import {
  Route,
  Outlet,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Header from './header/Header';
import Footer from './Footer';
import MainPage from '../pages/MainPage';
import { AuthForm } from './auth/AuthForm';
import { RootState } from '../store/store';
import BoardsList from '../pages/boards/BoardsList';
import Board from '../pages/board/Board';
import { resetActiveUser } from '../store/auth/authSlice';

function isItExpired(loginTime: number, expiresIn: string) {
  return (Date.now() - loginTime) / 1000 > +expiresIn;
}

function PrivateRoute() {
  const dispatch = useDispatch();
  const { activeUser, loginTime } = useSelector((state: RootState) => state.persist.user);

  if (loginTime && activeUser) {
    if (isItExpired(loginTime, activeUser.expiresIn)) {
      toast.warn('Your session expired. Please login again');
      dispatch(resetActiveUser());
    } else {
      return <Outlet />;
    }
  }
  return <Navigate to="/auth/login" />;
}

function PrivateAuthRoute() {
  const dispatch = useDispatch();
  const { activeUser, loginTime } = useSelector((state: RootState) => state.persist.user);
  if (loginTime && activeUser) {
    if (isItExpired(loginTime, activeUser.expiresIn)) {
      toast.warn('Your session expired. Please login again');
      dispatch(resetActiveUser());
    } else {
      return <Navigate to="/boards" />;
    }
  }

  return <Outlet />;
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
            <Route path=":id" element={<Board />} />
          </Route>
          <Route path="profile" element="<div>profile</div>" />
        </Route>
        <Route path="*" element="<div>404</div>" />
      </Route>
    </Route>
  )
);

export default router;
