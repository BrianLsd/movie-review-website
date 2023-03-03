import {Button, Container, Row, Col} from "react-bootstrap";
import NavBar from '.././Components/NavBar';
import Footer from ".././Components/Footer";
import Figure from 'react-bootstrap/Figure';

function MovieReview(props){
    return (
    <>
        <div className="background">
            <NavBar />
                <div>
                <Container>
                    <Row>
                        <Col>
                        <br />
                        <h1>Movie Reviews</h1>
                        {props.movies.map((movie, index) => (
                        <div key={index}>
                        <br />
                        <h2>{movie.name}</h2>
                        <p>Release: {movie.releaseDate}</p>
                        <p>Actors: {movie.actors}</p>
                        <p>Ratings: {movie.ratings}</p>
                        <Figure className="d-flex justify-content-center align-items-center">
                            <Figure.Image width={350} height={500} alt='Movie Image' src={movie.image}/>
                        </Figure>
                        <br />
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Button variant="danger" onClick={() => props.removeMovies(movie)}>Remove this movie</Button>
                        </div>
                        <hr />
                </div>
                ))}
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </div>
        </div>
    </>
    );
}

export default MovieReview;