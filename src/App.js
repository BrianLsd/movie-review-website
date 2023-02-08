import { Link } from "react-router-dom";

export function Home(){
  return (
    <div>
      <nav>
        <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/leaveReview">Leave Review</Link></li>
        </ul>
      </nav>
      <h1>Movie Review</h1>
    </div>
  );
}

export function MovieForm(){
  return (
    <div>
      <nav>
        <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/leaveReview">Leave Review</Link></li>
        </ul>
      </nav>
      <h1>Movie Form</h1>
    </div>
  );
}

function App() {
  return <Home/>;
}

export default App;
