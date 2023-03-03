import NavBar from '.././Components/NavBar';
import Footer from ".././Components/Footer";
import {useRef} from "react";
import {Button} from "react-bootstrap";
import Form from 'react-bootstrap/Form';

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
    "ratings":movieRatings.current.value, });
    props.setMovies(movieData);
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
            <Form method="post" action="/api/leave-review" encType='multipart/form-data'>
                <h5>Title</h5>
                <input name = "name" ref = {movieName} type="text"></input>
                <h5>Release</h5>
                <input name = "release" ref = {movieReleaseDate} type="text"></input>
                <h5>Actors</h5>
                <input name = "actor" ref = {movieActors} type="text"></input>
                <h5>Ratings - /5</h5>
                <select name = "rating" ref={movieRatings}>
                <option value="1/5">1</option>
                <option value="2/5">2</option>
                <option value="3/5">3</option>
                <option value="4/5">4</option>
                <option value="5/5">5</option>
                </select>
                <h5>Upload Image</h5>
                <input type='file' name='image' ref={movieImages}></input>
                <div style={{ display: "flex", justifyContent: "center" }}>
                <br/>
                    <Button  variant="danger" type='submit'>Submit</Button>
                </div>
            </Form>
            <Footer />
        </div>
    </div>
    </>
    );
}

export default MovieForm;