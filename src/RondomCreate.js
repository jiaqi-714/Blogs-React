import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RondomCreate = ({ activeIndex, setActiveIndex }) => {
    const [isPending, setPending] = useState(false)
    const naviagte = useNavigate()

    const handleClickCreate = () => {
        setPending(true)
        fetch("http://localhost:5000/rc", {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify("")
        }).then(() => {
            console.log("Random Blog Added");
            setPending(false)
            setActiveIndex(!activeIndex);
            naviagte("/")
        })
    }
    const handleClickDelete = () => {
        setPending(true)
        fetch("http://localhost:5000/rd", {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify("")
        }).then(() => {
            console.log("Random Blog Deleted");
            setPending(false)
            setActiveIndex(!activeIndex);
            naviagte("/")
        })
    }

    return ( 
        <div className="create">
            <button onClick={() => handleClickCreate()}>Create One Random Blog</button>
            <button onClick={() => handleClickDelete()}>Delete One Random Blog</button>
        </div>
    );
}
 
export default RondomCreate;