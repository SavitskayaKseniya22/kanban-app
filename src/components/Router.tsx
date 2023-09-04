import React from 'react';
import {
  Route,
  Outlet,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom';
import Header from './header/Header';
import Footer from './Footer';
import MainPage from '../pages/MainPage';

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
        <Route path="auth" element={<Outlet />}>
          <Route index element={<Navigate to="login" />} />
          <Route path="login" element="<div>login</div>" />
          <Route path="registration" element="<div>reg</div>" />
        </Route>
        <Route path="board" element={<Outlet />}>
          <Route index element="<div>board</div>" />
          <Route path=":id" element="<div>id</div>" />
        </Route>
        <Route path="*" element="<div>404</div>" />
      </Route>
    </Route>
  )
);

export default router;
