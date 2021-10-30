import { Route, Switch } from 'react-router-dom';
import Home from '@pages/Home';
import NotFoundPage from '@pages/NotFoundPage';
import Login from '@pages/Login';
import Register from '@pages/Register';
import { Header } from '@components';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/card" component={Home} />
        <Route path="/cards" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Register} />
        <Route path="/my-page" />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
