import { Switch } from 'react-router-dom';
import { HomePage, LoginPage, SignUpPage, MyPage, NotFoundPage } from '@pages';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const Router = () => {
  return (
    <Switch>
      <PublicRoute path="/" exact component={HomePage} />
      <PublicRoute restricted path="/login" component={LoginPage} />
      <PublicRoute restricted path="/signup" component={SignUpPage} />
      <PrivateRoute path="/my-page" component={MyPage} />
      <PublicRoute path="/cards" component={HomePage} />
      <PrivateRoute path="/card" component={HomePage} />
      <PublicRoute component={NotFoundPage} />
    </Switch>
  );
};

export default Router;
