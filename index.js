const express = require("express");
const cookieParser = require("cookie-parser");
const port = 8000;
const app = express();
const dataBase = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const { urlencoded } = require("express");
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
// const MongoStore = require('connect-mongo')(session);
const MongoStore = require('connect-mongo');
const nodeSassMiddleware = require("node-sass-middleware");
const flash = require('connect-flash');
const customMware = require('./config/middleware');

// Sass or Scss configuration
app.use(nodeSassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    // To get the debug flow
    // debug: true, 
    outputStyle: 'expanded',
    prefix: '/css'
}));

app.use(express.urlencoded());
app.use(cookieParser());

// Setting static files
app.use(express.static('./assets'));

// Needs to be placed before routes because we need to tell that whichever the views are going to be render belongs to some layout
app.use(expressLayouts);

// Extract style and scripts from the sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Mongo store is used to store the session cookie in the DB
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment to production
    secret: 'somerandomtext',
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/codeial_development',
        // mongooseConnection: dataBase,
        autoRemove: 'disabled'
    }, function (err) {
        console.log(err || `connect-mongodb setup is ok`);
    }),
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}
));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// Routes must be mentioned after passport initialization
// Using Router to take care of all paths
app.use('/', require("./routes"));

app.listen(port, (err) => {
    if (err) {
        console.log(`Error in starting the server ${err}`);
        return;
    }
    console.log(`Server is Ready to serve you on port ${port}`);
})