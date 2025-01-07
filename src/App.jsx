import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { HomePage, LibraryPage, NotFoundPage }  from './pages';
import { Header } from './components';
import { getGenres } from './redux/genres/thunks';
import './App.scss';

function App() {

  const dispatch = useDispatch();
  dispatch(getGenres());

  return (
    <>
      <Header />
      <main className='main'>
        <Routes>
          <Route path='/'  element={<HomePage />} />
          <Route path='/home'  element={<HomePage />} />
          <Route path='/library' element={<LibraryPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
