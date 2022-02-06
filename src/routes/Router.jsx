import { Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage, SignUpPage, MyPage, NotFoundPage } from '@pages';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute component={HomePage} />} />
      <Route
        path="/login"
        element={<PublicRoute restricted component={LoginPage} />}
      />
      <Route
        path="/signup"
        element={<PublicRoute restricted component={SignUpPage} />}
      />
      <Route path="/my-page" element={<PrivateRoute component={MyPage} />} />
      <Route path="*" element={<PublicRoute component={NotFoundPage} />} />
    </Routes>
  );
};

export default Router;
