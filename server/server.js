// this will be where the code for the server will be;
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const https = require("https");
const dbFile = "./Players-Teams.db"
const bodyParser = require('body-parser'); // require the required modules


const port = 8000;

const app = express();
app.use(bodyParser.json());
app.use(express.json());
// https
//     .createServer({
//         key: fs.readFileSync("./server-SSL/server.key"),
//         cert: fs.readFileSync("./server-SSL/server.cert")
//     },
//     app
//     )
app.listen(port, ()=> console.log(`server is listening on ${port}`));

const createConn = () =>{
    const db = new sqlite3.Database(dbFile, (err) =>{
        if (err) return -1;
    });
    return db;
}

app.get("/", (req, res) =>{
    console.log("Request made");
    res.send("<h1>Hello World</h1>")
})

app.post("/setFav", (req, res) =>{
    console.log("Working");
    
    if (!req.body.id) return res.status(400).send(JSON.stringify({error: "No <id> field in requst body"}));
    if (req.body.type === null) return res.status(400).send(JSON.stringify({error: "No <type> field in requst body"}));

    const db = createConn();

    if (db === -1){
        return res.status(500).send(JSON.stringify({error: "Server Failure To Connect To Database"}));
    }

    // set fav
    if (req.body.type === 1){
        db.run("Update Players Set isFavorite=1 where id=?;", [req.body.id] , (err) =>{
            if (err) {
                console.error(err);
                return res.status(500).send(JSON.stringify({error: "Failure To Update isFavorite"}));
            }
        })
    }
    else if(req.body.type === 0){
        db.run("Update Players Set isFavorite=0 where id=?", [req.body.id] , (err) =>{
            if (err) {
                console.error(err);
                return res.status(500).send(JSON.stringify({error: "Failure To Update isFavorite"}));
            }
        })
    }
    
    db.close();
    res.status(200).send(JSON.stringify([]));

});

app.post("/playerData", (req, res) =>{ // in the body include type: stats, or type: quick maybe? 
    const playerJson = req.body; //the name of the player
    console.log("Request made")
    if (!playerJson.playerName) {
        return res.status(400).send(JSON.stringify({error: "No <playerName> field in request"}))
    } // error handling

    const db = createConn(); // create connection to database

    if(db === -1){
        return res.status(500).send(JSON.stringify({error: "Server Failure To Connect To Database"}));
    }

    if (playerJson.playerName == "all"){
        db.all("Select  Players.*, Teams.teamName, Teams.teamAbv, StatsPerGame2022_2023.PTS, StatsPerGame2022_2023.AST, StatsPerGame2022_2023.REB, StatsPerGame2022_2023.FG_PERCENT, StatsPerGame2022_2023.TOV, StatsPerGame2022_2023.PLUS_MINUS  from   Players  INNER JOIN StatsPerGame2022_2023 On StatsPerGame2022_2023.PLAYER_ID = Players.id INNER JOIN Teams On Players.currentTeam = Teams.id", [], (err, data) =>{
            if (err || (!data[0])) {
                console.error(err);
                return res.status(500).send(JSON.stringify({error: "DATABASE ERROR QUERYING <all>"}));
            }
            else{
                console.log(data.length);
                return res.status(200).send(JSON.stringify(data)); 
            }
        });
    }
    else{
        db.all("Select  Players.*, Teams.teamName, Teams.teamAbv, StatsPerGame2022_2023.PTS, StatsPerGame2022_2023.AST, StatsPerGame2022_2023.REB, StatsPerGame2022_2023.FG_PERCENT  from   Players  INNER JOIN StatsPerGame2022_2023 On StatsPerGame2022_2023.PLAYER_ID = Players.id INNER JOIN Teams On Players.currentTeam = Teams.id Where Players.playerName = (?)", [playerJson.playerName], (err, rawData) =>{ // query all of the player data
            if (err || (!rawData[0])) {
                console.error(err);
                return res.status(404).send(JSON.stringify({error: "Player Not Found"}));
            }
            else{
                // console.log(rawData);
                return res.status(200).send(JSON.stringify(rawData)); 
            }
            
        });
    }
    
       
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

app.post("/getTeam-Players", (req, res) => {
    console.log("today Request made")
    if (!req.body.teamID) return res.status(400).send(JSON.stringify({error: "MISSING FIELD <teamID>"}));
    
    const db = createConn();
    if (db === -1) return res.status(500).send(JSON.stringify({error: "ERROR CREATING DATABASE CONNECTION"}));

    

    db.all("Select Players.*, Teams.*,  Players.id as playerID, Teams.id as teamID from Players inner Join Teams  on Teams.id = Players.currentTeam where Teams.id=(?)", [req.body.teamID], (err, data) =>{
        if (err){
            console.error(err);
            return res.status(500).send(JSON.stringify({error: "SQL QUERY ERROR"}));
        }
        else if (!data[0]){
            return res.status(404).send(JSON.stringify({error: `NO PLAYERS FOUND FOR teamID: ${req.body.teamID}`}))
        }
        else{
            data.map((item) =>{
                delete item.id;
                delete item.currentTeam;
            })
        console.log(data);
        return res.status(200).send(JSON.stringify(data));
        }
        
    })
})


app.post("/getStats", (req, res) =>{ // must include teamName and/or playerName fields in body
    const db = createConn();

    if (req.body.playerName == "all"){ // if all in playername select all stats
        db.all("Select * from StatsPerGame2022_2023 Inner Join Teams  On Teams.id=StatsPerGame2022_2023.TEAM_ID Inner Join Players on Players.id=StatsPerGame2022_2023.PLAYER_ID", (err, data) =>{
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
        console.log("Called")
        db.all("SELECT * from StatsPerGame2022_2023  Inner Join Teams  On Teams.id=StatsPerGame2022_2023.TEAM_ID Inner Join Players on Players.id=StatsPerGame2022_2023.PLAYER_ID where Teams.teamName=(?) and Players.playerName=(?) Collate NOCASE;", [req.body.teamName, req.body.playerName], (err, nData) =>{ // pull the stats
            if (err) {
                return res.status(500).send(JSON.stringify({error: err}));
            }
            else if (!nData[0]) {
                return res.status(404).send(JSON.stringify({error: `'${req.body.playerName}' Not Found On Team: '${req.body.teamName}'`})); // handle errors
            }
            else {
                return res.status(200).send(JSON.stringify(nData)) // send data
            }
        });

    }
    else if(req.body.teamName){

        db.all("SELECT * from StatsPerGame2022_2023  Inner Join Teams  On Teams.id=StatsPerGame2022_2023.TEAM_ID Inner Join Players on Players.id=StatsPerGame2022_2023.PLAYER_ID where Teams.teamName=(?) Collate NOCASE;", [req.body.teamName], (err, nData) =>{ // pull stats
            if (err){ 
                return res.status(500).send(JSON.stringify({error: err}))
            }
            else if (!nData[0]){ 
                
                return res.status(404).send(JSON.stringify({error: `Data Not Available For ${req.body.teamName}`})) // handle errors
            }
            else {
                return res.status(200).send(JSON.stringify(nData));
            }
        });

    }
    else if (req.body.playerName){
        db.get("SELECT * from StatsPerGame2022_2023 inner join Players on Players.id=StatsPerGame2022_2023.PLAYER_ID where Players.playerName=(?) collate NOCASE",[req.body.playerName], (err, nData) => { // query the team data for the player
            if ((err) || (!nData)) {
                return res.status(404).send(JSON.stringify({error: `Data Not Available For ${req.body.playerName}`}))
            }
            else {
                
                return res.status(200).send(JSON.stringify(nData)); // send data
            } 
        });

    }
    else{
        return res.status(400).send(JSON.stringify({error: "Request body must include <teamName> or <playerName> field"})); // if neither field exists give bad syntax error
    }
    db.close(); // clean up database connection.
});

