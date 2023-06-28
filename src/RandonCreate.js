import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RandomCreate = () => {
    const [isPending, setPending] = useState(false)
    const naviagte = useNavigate()

    const handleClick = () => {
        setPending(true)
        fetch("http://localhost:5000/rc", {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify("")
        }).then(() => {
            console.log("Random Blog Added");
            setPending(false)
            naviagte("/")
        })
    }

    return ( 
        <div className="create">
            <button onClick={() => handleClick()}>Create One Random Blog</button>
        </div>
    );
}
 
export default RandomCreate;