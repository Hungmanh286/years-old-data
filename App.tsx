
import React, { useState } from 'react';
import { GlobalStyles } from './components/GlobalStyles';
import HomePage from './pages/Home.tsx';
import ResearchPage from './pages/Research.tsx';
import ArticleReaderPage from './pages/ArticleReader.tsx';
import ChartLibraryPage from './pages/ChartLibrary.tsx';
import ServicesPage from './pages/Services.tsx';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomePage onNavigate={handleNavigate} />;
      case 'research': return <ResearchPage onNavigate={handleNavigate} />;
      case 'article': return <ArticleReaderPage onNavigate={handleNavigate} />;
      case 'charts': return <ChartLibraryPage onNavigate={handleNavigate} />;
      case 'services': return <ServicesPage onNavigate={handleNavigate} />;
      default: return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div>
      <GlobalStyles />
      {renderPage()}
    </div>
  );
};

export default App;
