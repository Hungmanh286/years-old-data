
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './components/GlobalStyles';
import HomePage from './pages/Home.tsx';
import ResearchPage from './pages/Research.tsx';
import ArticleReaderPage from './pages/ArticleReader.tsx';
import ChartLibraryPage from './pages/ChartLibrary.tsx';
import ServicesPage from './pages/Services.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/article" element={<ArticleReaderPage />} />
          <Route path="/charts" element={<ChartLibraryPage />} />
          <Route path="/services" element={<ServicesPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
