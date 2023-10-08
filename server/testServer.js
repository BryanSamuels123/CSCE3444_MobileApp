const fetch = require('node-fetch');


const getPlayerData = async () => {
    const data = {
        playerName: "Lebron James"
        
    }
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        
    }


    try{
        const dataStream = await fetch("http://localhost:8000/getPlayerData", params);
        const retData = await dataStream.text();

        console.log(retData);
    }
    catch(err){
        console.error(err);
    }

}

getPlayerData();