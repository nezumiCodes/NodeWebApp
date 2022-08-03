const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Sale = require('./models/sale.js');

//create an express instance
const app = express();

//mongoDB connection URI, remember to change 'password' with your password and myFirstDatabase with your database name
const dbURI = 'mongodb+srv://ADBMSUser:Password123@cluster0.e7v3d.mongodb.net/SalesDB?retryWrites=true&w=majority';

//using mongoose to connect to MongoDB, the last two option to avoid deprecation warnings.
mongoose.connect(dbURI, { useNewUriParser: true, useUnifiedToplolgy: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');//it uses the default 'views' folder

//middleware and statyic file
app.use(morgan('dev'));// option include, 'tiny', 'dev', 


//Mongoose and MongoDB sandbox
app.get('/add-sale', (req, res) => {
    const sale = new Sale({
        itemName: 'potato',
        itemDesc: 'eat one potator a day',
        quantity: 20
    });

    sale.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
})

app.get('/all-sale', (req, res) => {
    Sale.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
})



app.get('/single-sale', (req, res) => {
    Sale.findbyID('MongoDB_Document_ID')//get ID from MongoDB and paster here
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
})



app.get('/', (req, res) => {
    const blogs = [
        { itemName: 'eggs', itemDesc: 'eggs come from hen', quantity: '25' },
        { itemName: 'stars fish', itemDesc: 'star fish is rare', quantity: '25'},
        { itemName: 'jelly fish', itemDesc: 'Jelly fish can be poision', quantity: '25'},
    ];
    res.render('index', { title: 'Home Sales Home', blogs: blogs});//render index.ejs and pass the title value to EJS file
});
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a mew Sales Blog' });
});
app.get('/about', (req, res) => {
    res.render('about', { title: 'About Sales Blog'});
});
//redirects
app.get('/about-me', (req, res) => {
    res.redirect('/about', {title: 'About Sales Blog' });//redirect to html file data and set status code
});

app.use((req, res)=> {
    res.status(404).render('404', { title: 'Page not found' });
})
