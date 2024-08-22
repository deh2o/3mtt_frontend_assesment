import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReposList from './pages/ReposList';
import RepoDetail from './pages/RepoDetail';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<ReposList />} />
            <Route path="/repo/:id" element={<RepoDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </AuthProvider>
    </Router>
  );
}

export default App;
