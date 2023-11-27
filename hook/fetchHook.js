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
            const resp = await fetch(`http://18.118.102.93:8000/${endpoint}`, params);
            const data =  await resp.json();
            console.log(data.length);
            setData(data);
            // console.log("FetchHook is being called again");
            // setIsLoading(false);
            // console.log(resp);
        }
        catch(err){
            setError(err);
            
            console.error(err)
            alert("API Request Error");
        }
        finally{
            // console.log("RAAAH")
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