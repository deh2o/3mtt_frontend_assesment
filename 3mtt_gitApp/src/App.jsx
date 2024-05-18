// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RepoList from './components/RepoList';
import RepoDetails from './components/RepoDetails';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RepoList />} />
        <Route path="/details" element={<RepoDetails />} />
        <Route path="/details/#:id" element={<RepoDetails />} />
        <Route path="*" element={<ErrorBoundary/>} />
      </Routes>
    </Router>
  );
}

export default App;
