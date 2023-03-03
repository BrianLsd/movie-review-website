import {Nav, Navbar, Container} from "react-bootstrap";
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
    <Navbar bg="dark" variant="dark">
        <Container>
            <Nav className="me-auto">
                <Nav.Link as={Link} to={"/"}>Movie Review</Nav.Link>
                <Nav.Link as={Link} to={"/leave-review"}>Leave Review</Nav.Link>
            </Nav>
        </Container>
    </Navbar>
    );
}

export default NavBar;