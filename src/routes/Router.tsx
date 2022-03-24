import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spinner } from '@/components';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const HomePage = lazy(() => import('@/pages/HomePage/index'));
const LoginPage = lazy(() => import('@/pages/LoginPage/index'));
const SignUpPage = lazy(() => import('@/pages/SignUpPage/index'));
const MyPage = lazy(() => import('@/pages/MyPage/index'));
const GuidePage = lazy(() => import('@/pages/GuidePage/index'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage/index'));

const Router = () => {
  return (
    <Suspense fallback={<Spinner />}>
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
        <Route path="/guide" element={<PublicRoute component={GuidePage} />} />
        <Route path="*" element={<PublicRoute component={NotFoundPage} />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
