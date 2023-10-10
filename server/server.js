// this will be where the code for the server will be;
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const dbFile = "../Data-Functions/Players-Teams.db"
const bodyParser = require('body-parser'); // require the required modules


const port = 8000;
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.listen(port, ()=> console.log(`app is listening on ${port}`));

const creatConn = () =>{
    const db = new sqlite3.Database(dbFile, (err) =>{
        if (err) return console.error(err.message);
    });
    return db;
}

app.post("/getPlayerData", (req, res) =>{ // in the body include type: stats, or type: quick maybe? 
    const playerJson = req.body; //the name of the player

    if (!playerJson.playerName) return res.status(400).send(JSON.stringify({error: "No <playerName> field in request"})) // error handling

    const db = creatConn(); // create connection to database

    db.all("SELECT * FROM Players where playerName=(?) COLLATE NOCASE", [playerJson.playerName], (err, rawData) =>{ // query all of the player data
        if (err || (!rawData[0])) {
            console.error(err);
            return res.status(404).send(JSON.stringify({error: "Player Not Found"}));
        }
        else{
            console.log(rawData);


            db.get("SELECT teamName, teamAbv from Teams where Teams.id =(?)",[rawData[0].currentTeam], (err, teamName) => { // query the team data for the player
                rawData[0].teamName = (err) ? "NA" : teamName.teamName;
                rawData[0].teamAbv = (err) ? "NA" : teamName.teamAbv;
                console.log(rawData);
                res.status(200).send(JSON.stringify(rawData)); 
            })
        }
        
    });
       
    db.close(); // clean up open connection
});
