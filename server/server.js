// this will be where the code for the server will be;
const express = require("express");
const bodyParser = require('body-parser'); // require the required modules


const port = 8000;
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.listen(port, ()=> console.log(`app is listening on ${port}`));

app.post("/getPlayerData", (req, res) =>{
    // const data = req.body
    console.log(req.body);


    res.status(200).send(JSON.stringify({jsonASF: "This Worked"}));
});
