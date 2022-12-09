const express = require("express");
const port = 8000;
const app = express();

// Using Router to take care of all paths
app.use('/', require("./routes"));

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, (err) => {
    if(err){
        console.log(`Error in starting the server ${err}`);
        return;
    }
    console.log(`Server is Ready to serve you on port ${port}`);
})