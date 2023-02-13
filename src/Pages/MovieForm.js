import NavBar from '.././Components/NavBar';
import Footer from ".././Components/Footer";
import {useRef} from "react";

function MovieForm(props){
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
        <div className="background">
            <div>
            <NavBar />
                <br />
                <h1>Leave a Review</h1>
            </div>
            <div>
            <form onSubmit={submit}>
                <h5>Title</h5>
                <input ref = {movieName} type="text"></input>
                <h5>Release</h5>
                <input ref = {movieReleaseDate} type="text"></input>
                <h5>Actors</h5>
                <input ref = {movieActors} type="text"></input>
                <h5>Ratings - /5</h5>
                <select ref={movieRatings}>
                <option value="1/5">1</option>
                <option value="2/5">2</option>
                <option value="3/5">3</option>
                <option value="4/5">4</option>
                <option value="5/5">5</option>
                </select>
                <h5>Select Image</h5>
                <select ref={movieImages}>
                <option value="./images/pulp_fiction.jpg">Pulp Fiction</option>
                <option value="./images/scarface.jpg">Scarface</option>
                <option value="./images/raging_bull.jpg">Raging Bull</option>
                <option value="./images/john_wick.jpg">John Wick</option>
                <option value="./images/saw4.jpg">Saw IV</option>
                <option value="./images/placeholder.jpg">Other</option>
                </select>
            <div>
                <br/>
                <button style={{ display: "flex", justifyContent: "center" }}>Submit</button>
            </div>
            </form>
            <Footer />
        </div>
    </div>
    </>
    );
}

export default MovieForm;