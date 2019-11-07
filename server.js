const express = require("express");
// Invoke express and store the result in the variable app
const app = express();
//adding mongoose
const mongoose = require('mongoose');
app.use(express.urlencoded({
    extended: true
}));
// Set static folder for html and css files.
app.use(express.static(__dirname + "/static"));
// Set location for ejs views
app.set('views', __dirname + '/views');
// Set ejs views engine
app.set('view engine', 'ejs');


//  Connect Mongoose to MongoDB
mongoose.connect('mongodb://localhost/Quetes', {
    useNewUrlParser: true
});
///Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const QuoteSchema = new mongoose.Schema({ /// mongoose.schema is a object constructor
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    quote: {
        type: String,
        required: true,
        min: 5,
        max: 255
    }
}, {
    timestamps: true
});
mongoose.connection.on('connected', () => console.log('Connected to MongoDB!'));
mongoose.model('Quotes', QuoteSchema);
const Quote = mongoose.model('Quotes');

// set up Promises
mongoose.Promise = global.Promise;

// where the routes used to be, we're going to require routes.js
// since routes.js exports a function, server.js will receive that function
// invoke the function we get from the require and pass it app as an argument

require('./server/config/routes.js')(app)



app.listen(8000, () => console.log("listening on port 8000"));


//// when we add quotes from index page, all quotes added to database. To Check quotes from database. 
//step1- type show dbs
//then enter to that mentioned db from server.js file. type use database name
// step3 -type showcollections
/// step4 db.collection_name.find().pretty()