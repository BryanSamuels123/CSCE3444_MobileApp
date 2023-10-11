const fetch = require('node-fetch');



//will pass in player name
const getPlayerData = async (playerJson) => {
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(playerJson)
        
    }


    try{
        const dataStream = await fetch("http://localhost:8000/playerData", params);
        const retData = await dataStream.text();

        console.log(retData);
    }
    catch(err){
        console.error(err);
    }

}

const getTeamData = async (teamJson) =>{
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(teamJson)
        
    }   

    try{
        const dataStream = await fetch("http://localhost:8000/teamData", params)
        const data = await dataStream.json();
        console.log(data);
    }
    catch (err){
        console.error(err);
    }
};

// getPlayerData({playerName: "Trae Young"});
getTeamData({teamName: "all"});