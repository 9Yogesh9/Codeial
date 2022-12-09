const express = require("express");
const port = 8000;
const app = express();

app.listen(port, (err) => {
    if(err){
        console.log(`Error in starting the server ${err}`);
        return;
    }
    console.log(`Server is Ready to serve you on port ${port}`);
})