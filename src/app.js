const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const utils = require('./helperFunctions.js')

//Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname,'../public'); 
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Setup handlebars engine and views location
app.set('views',viewsPath);
app.set('view engine','hbs');
hbs.registerPartials(partialsPath);

//Setup static directory to serve CSS and JS files 
app.use(express.static(publicDirectoryPath));
 
//using response methods for serving up dynamic templates
app.get('', (req,res) =>{
    res.render('index',{
        title : 'Weather',
        obsession : true
    });
})

app.get('/about',(req, res) =>{
    res.render('about',{
        title : 'Rachit Shukla',
        happens : true
    }) 
})

app.get('/help', (req,res) =>{
    res.render('help', {
        title : 'Contact me on +919122014214',
        howMuch : 'Lots'
    })
})
app.get('/weather', (req,res) =>{
    if(!req.query.address)
    {
        return res.send({
            error : "Please enter an address!"
        })
    }

    utils.geocode(req.query.address, (error,{latitude,longitude,location} = {}) =>{
        if(error)
        {
            return res.send({error})
        }

        utils.convertGeoToFore(longitude,latitude,(error,forecastData) =>{
            if(error)
            {
                res.send({error});
            }

            res.send({
                forecast : forecastData, 
                weather : forecastData.howItIs,
                rain : forecastData.precip,
                address : req.query.address
            })

        })
    })

    // res.send({
    //     forecast : "great",
    //     place : "London",
    //     address : req.query.address
    // })
})

app.get('/help/*' , (req,res) =>{
    res.render('404error',{
        title : "Help article not found!"
    })
})


app.get('*', (req,res) =>{
    res.render('404error',{
        title : "Page not found!"
    })
})

app.listen(3000, () =>{

    console.log(`Server is up and running!`);
})

//app.com
//app.com/help
