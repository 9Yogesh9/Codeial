const express = require("express");
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');

// Setting static files
app.use(express.static('./assets'));
// Needs to be placed before routes because we need to tell that whichever the views are going to be render belongs to some layout
app.use(expressLayouts);
// Extract style and scripts from the sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

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