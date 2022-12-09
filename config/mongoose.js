const mongoose = require('mongoose');
// To remove warning
mongoose.set('strictQuery', false);

main().catch(err => console.log(`Error talking to MongoDB : ${err}`));
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/codeial_development");
}

// mongoose.connect('mongodb://localhost/codeial_development');
// mongoose.connect('mongodb://127.0.0.1:27017/codeial_development');
const db = mongoose.connection;

// db.on('error', console.error.bind(console, "Error talking to MongoDB"));
db.once('open', ()=>{
    console.log(`Data flowing through Mongo...`);
});

module.exports = db;