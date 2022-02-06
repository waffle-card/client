import { Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage, SignUpPage, MyPage, NotFoundPage } from '@pages';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { CardEditModal, ChattingCard } from '@components';

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <HomePage />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute restricted>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute restricted>
            <SignUpPage />
          </PublicRoute>
        }
      />
      <Route
        path="/my-page"
        element={
          <PrivateRoute>
            <MyPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/cards/*"
        element={
          <PublicRoute>
            <HomePage />
          </PublicRoute>
        }>
        <Route
          path="my/create"
          element={
            <PrivateRoute>
              <CardEditModal visible />
            </PrivateRoute>
          }
        />
        <Route
          path="my/update/:cardId"
          element={
            <PrivateRoute>
              <CardEditModal visible editMode />
            </PrivateRoute>
          }
        />
      </Route>
      <Route
        path="/card/*"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }>
        <Route
          path="detail/:Param/:cardId"
          element={<ChattingCard visible />}
        />
      </Route>
      <Route
        path="*"
        element={
          <PublicRoute>
            <NotFoundPage />
          </PublicRoute>
        }
      />
    </Routes>
  );
};

export default Router;
