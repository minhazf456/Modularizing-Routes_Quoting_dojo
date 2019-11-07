const mongoose = require('mongoose');
const Quote = mongoose.model('Quotes');

module.exports = function(app) {
    // GET ' / ' for the index
    app.get('/', function(req, res) {
        res.render('index');
    });
    //// The last thing we need is to query our database for our users that we create with our form.  Modify your root route accordingly:
// set up GET '/quotes' in time-stamp & display.. This GET route first query the documents from database(means gathering information from database), sort it and display information to the quotes page.
app.get('/quotes', function (req, res) {
    Quote
        .find()
        .sort({
            createdAt: -1
        })
        .exec(function (err, quotes) {
            if (err) {
                console.log(err);
            } else {
                res.render('quotes', {
                    quotes: quotes
                });
            }
        });
});

////Now that we have our model set up, let's go ahead and use it to save a quote to the database via post request to '/quotes'.
// use  POST '/quotes' to create a new quote & add to list

app.post('/quotes', function (req, res) {
    const quote = new Quote({
        name: req.body.name,
        quote: req.body.quote
    });
    quote.save(function (err) {
        if (err) {
            console.log(`Unable to add to database. Check browser for errors.`);
            res.render('index', {title: 'you have errors!', errors: quote.errors});
            // console.log(err);
        } else {
            console.log("Added quote");
            res.redirect('/quotes');
        }
    });
});
}





