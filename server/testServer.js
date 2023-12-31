const fetch = require('node-fetch');
// may need to do "npm install node-fetch@2" if not working

// shows format of the api calls that the server is expecting

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
        const dataStream = await fetch("http://3.145.193.188:8000/playerData", params);
        const retData = await dataStream.json();

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
        const dataStream = await fetch("http://3.145.193.188:8000/teamData", params)
        const data = await dataStream.json();
        console.log(data);
    }
    catch (err){
        console.error(err);
    }
};

const getStats = async (resuestJson) =>{
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(resuestJson)
        
    }   

    try{
        const dataStream = await fetch("http://3.145.193.188:8000/getStats", params)
        const data = await dataStream.json();
        console.log(data);
    }
    catch (err){
        console.error(err);
    }
};

const getTeamPlayers = async (resuestJson) =>{
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(resuestJson)
        
    }   

    try{
        const dataStream = await fetch("http://3.145.193.188:8000/getTeam-Players", params)
        const data = await dataStream.json();
        console.log(data);
    }
    catch (err){
        console.error(err);
    }
};
// export {getPlayerData}
// export {
//     getPlayerData,
//     getTeamData,
//     getStats
// }

// getPlayerData({playerName: "all"});
getTeamPlayers({teamID: 44})
// getTeamData({teamName: "Los Angeles Lakers"});
// getStats({playerName: "Stephen Curry"});
