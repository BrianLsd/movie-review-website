import { Routes, Route} from 'react-router-dom';
import {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Main.css';
import MovieReview from './Pages/MovieReviews';
import MovieForm from './Pages/MovieForm';

function Main() {
  const [movies, setMovies] = useState(null);
  useEffect( () => {
    fetch("/api/movies")
    .then(response => response.json())
    .then(setMovies)
    .catch(e => console.log(e))
  }, []);

  if (movies == null) {
    return <h1>Loading movies...</h1>
  };

  const removeMovies = async (movieToRemove) => {
    try {
      const response = await fetch(`/api/remove-movie/${movieToRemove.name}`, {method:'POST'});
      const {message} = await response.json();
      if (response.status === 200){
        alert(message);
        fetch("/api/movies")
        .then(response => response.json())
        .then(setMovies)
      } else {
        alert(message);
      }
    } catch (e) {
      console.log(e);
    }
    
  };

  return (
    <Routes>
        <Route path="/" element={<MovieReview movies={(movies)} removeMovies={removeMovies}/>}></Route>
        <Route path="/leave-review" element={<MovieForm movies={(movies)} setMovies={setMovies}/>}></Route>
    </Routes>
  );
}

export default Main;