import { Link } from "react-router-dom";

const NotFound = () => {
    return ( 
        <div>
            <h2>Sorry</h2>
            <p>This Page Is Not Found</p>
            <Link to="/">Go To Home Page</Link>
        </div>
    );
}
 
export default NotFound;