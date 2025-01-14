import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { HomePage, LibraryPage, NotFoundPage }  from './pages';
import { Footer, Header, Redirect } from './components';
import { getGenres } from './redux/genres/thunks';
import { setMovies } from './redux/library/slice';
import './App.scss';

function App() {
  const dispatch = useDispatch();
  dispatch(getGenres());
  dispatch(setMovies({
    watched: localStorage.getItem('filmoteka_watched') ? JSON.parse(localStorage.getItem('filmoteka_watched')) : [],
    queue: localStorage.getItem('filmoteka_queue') ? JSON.parse(localStorage.getItem('filmoteka_queue')) : []
  }))

  return (
    <>
      <Header />
      <main className='main'>
        <Routes>
          <Route path='/'  element={<Redirect path={'/home'}/>} />
          <Route path='/home'  element={<HomePage />} />
          <Route path='/library' element={<Redirect path={'/library/watched'} />} />
          <Route path='/library/watched' element={<LibraryPage type="watched" />} />
          <Route path='/library/queue' element={<LibraryPage type="queue" />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
