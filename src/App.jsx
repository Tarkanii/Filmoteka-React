import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LibraryPage from './pages/LibraryPage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header';
import './App.scss';


function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/'  element={<HomePage />} />
          <Route path='/library' element={<LibraryPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
