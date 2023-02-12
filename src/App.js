import { Routes, Route, Link } from 'react-router-dom';
import {useState, useEffect, useRef} from "react";

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

export function MovieForm(props){
  const movieName = useRef();
  const movieReleaseDate = useRef();
  const movieActors = useRef();
  const movieRatings = useRef();
  const movieImages = useRef();

  const submit = (event) => {
    event.preventDefault();
    const movieData = [];
    props.movies.forEach( movie => {
      movieData.push(movie);
    })
    movieData.push({"name":movieName.current.value,
    "releaseDate":movieReleaseDate.current.value,
    "actors":movieActors.current.value,
    "image":movieImages.current.value,
    "ratings":movieRatings.current.value});
    props.movies.push(movieData);
    props.setMovies(movieData);
    alert(`${movieName.current.value} has been added.`)
  }

  return (
    <>
      <div>
        <nav>
          <ul>
          <li><Link to="/">Movie Review</Link></li>
          <li><Link to="/leave-review">Leave Review</Link></li>
          </ul>
        </nav>
        <h1>Movie Form</h1>
      </div>
      <div>
        <form onSubmit={submit}>
          <h3>Title</h3>
          <input ref = {movieName} type="text"></input>
          <h3>Release</h3>
          <input ref = {movieReleaseDate} type="text"></input>
          <h3>Actors</h3>
          <input ref = {movieActors} type="text"></input>
          <h3>Ratings - /5</h3>
          <select ref={movieRatings}>
            <option value="1/5">1</option>
            <option value="2/5">2</option>
            <option value="3/5">3</option>
            <option value="4/5">4</option>
            <option value="5/5">5</option>
          </select>
          <h3>Select Image</h3>
          <select ref={movieImages}>
            <option value="./images/pulp_fiction.jpg">Pulp Fiction</option>
            <option value="./images/scarface.jpg">Scarface</option>
            <option value="./images/raging_bull.jpg">Raging Bull</option>
            <option value="./images/john_wick.jpg">John Wick</option>
            <option value="./images/saw4.jpg">Saw IV</option>
            <option value="./images/placeholder.jpg">Other</option>
          </select>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    </>
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
    alert(`${movieToRemove.name} is removed`);
    setMovies((rest) => rest.filter((review) => review.name !== movieToRemove.name))
  };

  return (
    <Routes>
        <Route path="/" element={<MovieReview movies={(movies)} removeMovies={removeMovies}/>}></Route>
        <Route path="/leave-review" element={<MovieForm movies={(movies)} setMovies={setMovies}/>}></Route>
    </Routes>
  );
}

export default App;