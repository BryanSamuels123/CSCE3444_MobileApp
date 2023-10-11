// this will be where the code for the server will be;
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const dbFile = "../Data-Functions/Players-Teams.db"
const bodyParser = require('body-parser'); // require the required modules

const port = 8000;

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.listen(port, ()=> console.log(`server is listening on ${port}`));

const createConn = () =>{
    const db = new sqlite3.Database(dbFile, (err) =>{
        if (err) return console.error(err.message);
    });
    return db;
}

app.post("/playerData", (req, res) =>{ // in the body include type: stats, or type: quick maybe? 
    const playerJson = req.body; //the name of the player

    if (!playerJson.playerName) {
        return res.status(400).send(JSON.stringify({error: "No <playerName> field in request"}))
    } // error handling

    const db = createConn(); // create connection to database

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
                return res.status(200).send(JSON.stringify(rawData)); 
            })
        }
        
    });
       
    db.close(); // clean up open connection
});

// pull team data
app.post("/teamData", (req, res) =>{ // include a "teamName"    
    const db = createConn();        // teamName: "all" for all teams

    if (!req.body.teamName) {
        return res.status(400).send(JSON.stringify({error: "MUST INCLUDE <teamName> in body of request"}));
    }
    else if (req.body.teamName == "all"){ 
        db.all("Select * from Teams", [], (err, data) =>{
            if (err)  {
                return res.status(500).send(JSON.stringify({error: "INTERNAL SERVER ERROR"}));
            }
            else {
                return res.status(200).send(JSON.stringify(data));
            }
        });
    }
    else{
        db.all("Select * from teams where teamName=(?) COLLATE NOCASE", [req.body.teamName], (err, data) =>{
            if (err || (!data[0])) {
                return res.status(404).send(JSON.stringify({error: "Team Not Found"}));
            }
            else {
                return res.status(200).send(JSON.stringify(data));
            }
        })
        
    }

    db.close();
})


app.post("/getStats", (req, res) =>{ // must include teamName and/or playerName fields in body
    const db = createConn();

    if (req.body.playerName == "all"){ // if all in playername select all stats
        db.all("Select * from StatsPerGame2022_2023", (err, data) =>{
            if (err){
                return res.status(500).send(JSON.stringify({error: err}));
            }
            else if (!data[0]){
                return res.status(500).send(JSON.stringify({error: "INTERNAL SERVER ERROR;\nNO DATA AVAILABLE"})); // handle errors
            }
            else{
                return res.status(200).send(JSON.stringify(data)); // send final data
            }
        })
    }
    else if ((req.body.teamName) && (req.body.playerName)){ // if both fields exist do a more specific search
    
        db.get("Select id from teams where teamName=(?) COLLATE NOCASE", [req.body.teamName], (err, team) =>{ // find the proper team id
            if (err){ 
                res.status(404).send(JSON.stringify({error: err}))
            }
            else if (!team){ 
                res.status(404).send(JSON.stringify({error: "Team Not Found"})) // handle errors
            }
            else {
                db.get("SELECT id FROM Players where playerName=(?) COLLATE NOCASE", [req.body.playerName], (err, player) =>{ // find the proper player id
                    if (err) {
                        console.error(err);
                        res.status(404).send(JSON.stringify({"error": err}))
                    }
                    else if (!player) { // handle errors
                        console.error(err);
                        res.status(404).send(JSON.stringify({"error": "Player Not Found"}))
                    }
                    else{
                        
                        db.all("SELECT * from StatsPerGame2022_2023 where TEAM_ID=(?) and PLAYER_ID=(?);", [team.id, player.id], (err, nData) =>{ // pull the stats
                            if (err) {
                                return res.status(404).send(JSON.stringify({error: err}));
                            }
                            else if (!nData[0]) {
                                return res.status(404).send(JSON.stringify({error: `'${req.body.playerName}' Not Found On Team: '${req.body.teamName}'`})); // handle errors
                            }
                            else {
                                return res.status(200).send(JSON.stringify(nData)) // send data
                            }
                        });
                    }
                });
            }
        });
    }
    else if(req.body.teamName){
        db.get("Select id from teams where teamName=(?) COLLATE NOCASE", [req.body.teamName], (err, data) =>{ // if only team name in parameters find proper id
            if (err) {
                return res.status(404).send(JSON.stringify({error: err}))
            }
            else if (!data) {
                return res.status(404).send(JSON.stringify({error: "Team Not Found"})) // handle errors
            }
            else{
                db.all("SELECT * from StatsPerGame2022_2023 where TEAM_ID=(?)", [data.id], (err, nData) =>{ // pull stats
                    if (err){ 
                        return res.status(404).send(JSON.stringify({error: err}))
                    }
                    else if (!nData[0]){ 
                        
                        return res.status(404).send(JSON.stringify({error: `Data Not Available For ${req.body.teamName}`})) // handle errors
                    }
                    else {
                        return res.status(200).send(JSON.stringify(nData));
                    }
                });
            }
        })
    }
    else if (req.body.playerName){
        db.all("SELECT id FROM Players where playerName=(?) COLLATE NOCASE", [req.body.playerName], (err, rawData) =>{ // query all of the player data
            if (err) {
                console.error(err);
                return res.status(404).send(JSON.stringify({error: err}));
            }
            else if(!rawData[0]){
                return res.status(404).send(JSON.stringify({error: "Player Not Found"})); // handle errors
            }   
            else{    
                db.get("SELECT * from StatsPerGame2022_2023 where PLAYER_ID=(?)",[rawData[0].id], (err, nData) => { // query the team data for the player
                    if ((err) || (!nData)) {
                        return res.status(404).send(JSON.stringify({error: `Data Not Available For ${req.body.playerName}`}))
                    }
                    else {
                        
                        return res.status(200).send(JSON.stringify(nData)); // send data
                    } 
                })
            }
            
        });

    }
    else{
        return res.status(400).send(JSON.stringify({error: "Request body must include <teamName> or <playerName> field"})); // if neither field exists give bad syntax error
    }
    db.close(); // clean up database connection.
});

