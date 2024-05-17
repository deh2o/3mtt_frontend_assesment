// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RepoList from './components/RepoList';
import RepoDetails from './components/RepoDetails';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={RepoList} />
        <Route path="/repos/:owner/:repo" component={RepoDetails} />
        <Route path="*" component={() => <div>404 Not Found</div>} />
      </Switch>
    </Router>
  );
}

export default App;
