// function to pull data from database;
import { useState, useEffect } from "react";


const fetchHook = (endpoint, query) =>{ // takes in a string(endpoint) and an object(query) as paramaters

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // creates setter with default variable
    const [error, setError] = useState(null);

    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
        
    }

    const fetchData = async () =>{
        setIsLoading(true);

        try{
            console.log(params);
            const resp = await fetch(`http://3.145.193.188:8000/${endpoint}`, params);
            const data =  await resp.json();
            // console.log(data)
            setData(data);
            // setIsLoading(false);
            // console.log(resp);
        }
        catch(err){
            setError(error);
            console.error(err)
            alert("API Request Error");
        }
        finally{
            setIsLoading(false);
        }
    }

    useEffect(() =>{
        fetchData();
    }, []);

    const refetch = () =>{
        setIsLoading(true);
        fetchData();
    }
    return {data, isLoading, error, refetch};
}

export default fetchHook;