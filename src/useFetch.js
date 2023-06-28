import { useEffect, useState } from 'react';

const useFetch = (url) => {
    const [isPending, setPengding] = useState(true);
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(url)
        .then((res) => {
            if (!res.ok){
                throw Error("Could not fetch data from that resources")
            }
            console.log(res);
            return res.json();
        })
        .then(data => {
            console.log(data);
            setData(data);
            setPengding(false);
            setError(null);
        })
        .catch(err => {
            setError(err.message)
            setPengding(false)
        })
    }, [url])

    return ({isPending, data, error});
}

export default useFetch;