import { Route, Switch } from 'react-router-dom';
import { HomePage, LoginPage, SignUpPage, MyPage, NotFoundPage } from '@pages';

const Router = () => {
  return (
    <Switch>
      {/* public - 메인 */}
      <Route path="/" exact component={HomePage} />

      {/* private - 카드 채팅방 조회 */}
      <Route path="/card" component={HomePage} />

      {/* private  - 내 생성 카드*/}
      <Route path="/cards/my" component={HomePage} />

      {/* private  - 좋아요 한 카드*/}
      <Route path="/cards/like" component={HomePage} />

      {/* public  - 카드 목록*/}
      <Route path="/cards" component={HomePage} />

      {/* public restricted */}
      <Route path="/login" component={LoginPage} />

      {/* public restricted */}
      <Route path="/signup" component={SignUpPage} />

      {/* private */}
      <Route path="/my-page" component={MyPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default Router;
