// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RepoList from './components/RepoList';
import RepoDetails from './components/RepoDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RepoList />} />
        <Route path="/repo/:id" element={<RepoDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
