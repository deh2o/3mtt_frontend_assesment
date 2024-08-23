import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from react-dom/client
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import RepoDetail from './pages/RepoDetail';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './pages/NotFound';

// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/repo/:repoName" element={<RepoDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);