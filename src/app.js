const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//General values
const author = 'Nextor';

//Defining paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setting up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setting up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App'
        , author
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me'
        , author
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page!'
        , message: 'This is a help page where you can find nothing :D'
        , author
    });
});

////Unreachable because of above configuration
// app.get('', (req, res) => {
//     res.send('<h1>Hello express!</h1><h3>Nextor te da la bienvenida ;)</h3>');
// });

////Unreachable because of above configuration
// app.get('/help', (req, res) => {
//     res.send([
//         {
//             name: 'Nextor'
//             , age: 28
//         }
//         ,
//         {
//             name: 'Del futurox!'
//             , age: 2020
//         }
//     ]);
// });

////Unreachable because of above configuration
// app.get('/about', (req, res) => {
//     res.send('<h3 style="color: blue;">About page</h3>');
// });

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({ error: 'You must provide an address!!!' });
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => { //Object destructuring
        if (error) {
            return res.send({ error });
        }
        else {
            forecast(latitude, longitude, (error, forecastdata) => {
                if (error) {
                    return res.send({ error });
                }
                else {
                    return res.send({
                        forecast: forecastdata
                        , location
                        , address: req.query.address
                    });
                }
            });
        } 
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            message: 'You must provide a search term!!!'
        });
    }
    
    res.send({
        products: []
    });

});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 page!'
        , message: 'Help article not found!'
        , author
    });
});

app.get('*', (req, res) => { //Goes at the end like specific to general rule
    res.render('404', {
        title: '404 page!'
        , message: 'Page not found!'
        , author
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
}); //start with specified port