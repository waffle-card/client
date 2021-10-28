import { Route } from 'react-router-dom';
import Home from '@pages/Home';
import NotFoundPage from '@pages/NotFoundPage';
import { CardEditForm } from '@components';
import ChattingCard from '@components/domain/ChattingCard';

import './App.css';

function App() {
  return (
    <div className="App">
      <Route path="/" exact={true} component={Home} />

      {/* <Route path="/login" component={} />
      <Route path="/signup" component={} />
      <Route path="/my-page" component={} /> */}

      <Route path="/cards/today" exact={true} component={Home} />
      <Route path="/cards/my" exact={true} component={Home} />
      <Route path="/cards/favorite" exact={true} component={Home} />

      <Route path="/card/create" exact={true} component={CardEditForm} />
      <Route path="/card/chat:cardId" exact={true} component={ChattingCard} />
      <Route path="/card/update:cardId" exact={true} component={CardEditForm} />

      <Route path="*" component={NotFoundPage} />
    </div>
  );
}

export default App;
