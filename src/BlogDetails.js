import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
    const {id} = useParams();
    const {isPending, data, error} = useFetch("http://localhost:5000/blogs/" + id);
    const navigate = useNavigate()

    const handleDelete = () => {
        fetch("http://localhost:5000/blogs/" + data.id, {
            method: 'DELETE'
        }).then(() => {
            navigate("/")
            console.log("delete blog with id " + id)
        })
    }

    return ( 
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {data && (
                <div>
                    <h2>{data.title}</h2>
                    <h3>{data.author}</h3>
                    <p>{data.blog}</p>
                </div>
            )}
            <button onClick={handleDelete}>Delete Blog</button>
        </div>
    );
}
 
export default BlogDetails;