import { Routes } from 'react-router-dom';
import { HomePage, LoginPage, SignUpPage, MyPage, NotFoundPage } from '@pages';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const Router = () => {
  return (
    <Routes>
      <PublicRoute path="/" element={<HomePage />} />
      <PublicRoute restricted path="/login" element={<LoginPage />} />
      <PublicRoute restricted path="/signup" element={<SignUpPage />} />
      <PrivateRoute path="/my-page" element={<MyPage />} />
      <PublicRoute path="/cards/*" element={<HomePage />} />
      <PrivateRoute path="/card" element={<HomePage />} />
      <PublicRoute element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
