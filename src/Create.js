import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState("Write Title here")
    const [body, setBody] = useState("Write Blog here")
    const [author, setAuthor] = useState("Erika")
    const [isPending, setPending] = useState(false)
    const naviagte = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author };

        setPending(true)
        fetch("http://localhost:5000/blogs", {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then(() => {
            console.log("New Blog Added");
            setPending(false)
            naviagte("/")
        })
    }

    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Blog title</label>
                <input 
                    type="text"
                    required
                    value = {title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog content</label>
                <input 
                    type="text"
                    required
                    value = {body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <label>Blog author</label>
                <select value = {author} onChange={(e) => setAuthor(e.target.value)}>
                    <option value="Erika">Erika</option>
                    <option value="Momo">Momo</option>
                </select>
                { !isPending && <button>Add Blog</button>}
                { isPending && <button disabled>Adding...</button>}

            </form>
            <p>{title}</p>
            <p>{body}</p>
            <p>{author}</p>
        </div>
    );
}

export default Create;