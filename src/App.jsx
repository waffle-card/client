import { Route, Switch } from 'react-router-dom';
import DefaultTemplate from '@pages/template/DefaultTemplate';
import Home from '@pages/Home';
import NotFoundPage from '@pages/NotFoundPage';
import Login from '@pages/Login';
import Register from '@pages/Register';
import './App.css';
// import { CardEditForm } from '@components';
// import ChattingCard from '@components/domain/ChattingCard';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Register} />
        <Route path="/my-page" />

        <Route path="/cards/today" component={Home} />
        <Route path="/cards/my" component={Home} />
        <Route path="/cards/favorite" component={Home} />

        {/* <Route path="/card/create" component={CardEditForm} />
        <Route path="/card/chat:cardId" component={ChattingCard} />
        <Route path="/card/update:cardId" component={CardEditForm} /> */}
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
