import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EditorProvider } from './context/EditorContext';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import Home from './pages/Home';
import Editor from './pages/Editor';
import Templates from './pages/Templates';

function App() {
  return (
    <ErrorBoundary>
      <EditorProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/editor" element={<Editor />} />
              <Route path="/templates" element={<Templates />} />
            </Routes>
          </Layout>
        </Router>
      </EditorProvider>
    </ErrorBoundary>
  );
}

export default App; 