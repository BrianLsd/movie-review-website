import { Routes, Route, Link } from 'react-router-dom';
import {useState, useEffect} from "react";

export function MovieReview(props){
  return (
    <>
    <div>
      <nav>
        <ul>
        <li><Link to="/">Movie Review</Link></li>
        <li><Link to="/leave-review">Leave Review</Link></li>
        </ul>
      </nav>
      <div>
        <h1>Movie Reviews</h1>
        {props.movies.map((movie, index) => (
          <div key={index}>
            <h2>{movie.name}</h2>
            <p>Release: {movie.releaseDate}</p>
            <p>Actors: {movie.actors}</p>
            <p>Ratings: {movie.ratings}</p>
            <img src={movie.image} alt={movie.name} />
            <div>
              <button onClick={() => props.removeMovies(movie)}>Remove this movie</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export function MovieForm(){
  return (
    <div>
      <nav>
        <ul>
        <li><Link to="/">Movie Review</Link></li>
        <li><Link to="/leave-review">Leave Review</Link></li>
        </ul>
      </nav>
      <h1>Movie Form</h1>
    </div>
  );
}

function App() {
  const [movies, setMovies] = useState(null);
  useEffect( () => {
    fetch("./movies.json")
    .then(response => response.json())
    .then(setMovies)
    .catch(e => console.log(e))
  }, []);

  if (movies == null) {
    return <h1>Loading movies...</h1>
  };

  const removeMovies = (movieToRemove) => {
    setMovies((rest) => rest.filter((review) => review.name !== movieToRemove.name))
  };

  return (
    <Routes>
        <Route path="/" element={<MovieReview movies={(movies)} removeMovies={removeMovies}/>}></Route>
        <Route path="/leave-review" element={<MovieForm />}></Route>
    </Routes>
  );
}

export default App;