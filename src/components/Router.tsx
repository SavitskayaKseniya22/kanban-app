import React from 'react';
import {
  Route,
  Outlet,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from './header/Header';
import MainPage from '../pages/MainPage';
import { AuthForm } from './auth/AuthForm';
import { useAppDispatch, useAppSelector } from '../store/store';
import Board from '../pages/board/Board';
import { resetActiveUser } from '../store/auth/authSlice';
import BoardWrapper from '../pages/boards/BoardWrapper';
import Page404 from '../pages/404/Page404';
import ErrorPage from '../pages/ErrorPage';
import BoardsList from '../pages/boards/BoardsList';
import Footer from './Footer';

function isItExpired(loginTime: number, expiresIn: string) {
  return (Date.now() - loginTime) / 1000 > +expiresIn;
}

function PrivateRoute() {
  const dispatch = useAppDispatch();
  const { activeUser, loginTime } = useAppSelector((state) => state.persist.user);

  if (loginTime && activeUser) {
    if (isItExpired(loginTime, activeUser.expiresIn)) {
      toast.warn('Your session expired. Please login again');
      dispatch(resetActiveUser());
    } else {
      return <Outlet />;
    }
  }
  return (
    <main>
      <Navigate to="/auth/login" />
    </main>
  );
}

function PrivateAuthRoute() {
  const dispatch = useAppDispatch();
  const { activeUser, loginTime } = useAppSelector((state) => state.persist.user);
  if (loginTime && activeUser) {
    if (isItExpired(loginTime, activeUser.expiresIn)) {
      toast.warn('Your session expired. Please login again');
      dispatch(resetActiveUser());
    } else {
      return (
        <main>
          <Navigate to="/boards" />
        </main>
      );
    }
  }

  return <Outlet />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />} id="root" element={<Outlet />}>
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
          <Route
            path="boards"
            element={
              <BoardWrapper>
                <Outlet />
              </BoardWrapper>
            }
          >
            <Route index element={<BoardsList />} />
            <Route path=":id" element={<Board />} />
          </Route>
        </Route>
        <Route path="*" element={<Page404 />} />
      </Route>
    </Route>
  )
);

export default router;
