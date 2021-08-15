import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loader from './Loader';

const Signup = lazy(() => import('./auth/Signup'));
const Login = lazy(() => import('./auth/Login'));
const Tasks = lazy(() => import('./tasks/Tasks'));
const AddTask = lazy(() => import('./tasks/AddTask'));

const GuestRouter = () => (
  <Switch>
    <Route path="/" exact>
      <Redirect to="/signup" />
    </Route>

    <Route path="/signup">
      <Suspense fallback={<Loader />}>
        <Signup />
      </Suspense>
    </Route>

    <Route path="/login">
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    </Route>

    <Route path="/logout">
      <Redirect to="/login" />
    </Route>
  </Switch>
);

const UserRouter = () => (
  <Switch>
    <Route path="/" exact>
      <Suspense fallback={<Loader />}>
        <Tasks />
      </Suspense>
    </Route>

    <Route path="/new" exact>
      <Suspense fallback={<Loader />}>
        <AddTask />
      </Suspense>
    </Route>

    <Route path="/signup">
      <Redirect to="/" />
    </Route>

    <Route path="/login">
      <Redirect to="/" />
    </Route>
  </Switch>
);

const AppRouter = () => {
  const [{ loggedIn }] = useAuth();
  return loggedIn ? <UserRouter /> : <GuestRouter />;
};

export default AppRouter;
