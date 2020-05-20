const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./Utils/geocode')
const forecast = require('./Utils/forecast')

const app = express()


//gives default directory name
//console.log(__dirname)

//use path.join(--dirname, '../..') one dotset go back one directory  
//define paths
const publicDirectory = path.join(__dirname, '../public')
const viewsPath =path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handelbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static deirtory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Ankit Sharma'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title:'About Me',
        name: 'Ankit Sharma'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        message: 'Need Help !!!',
        title:'Help',
        name: 'Ankit Sharma'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error:'you must give some address' 
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, forecastdata) =>{
            if(error){
                return res.send({
                    error: error
                })
            }
        
            res.send({
                temp: forecastdata.body.current.temp,
                humidity: forecastdata.body.current.humidity,
                discription: forecastdata.body.current.weather[0].description,
                location: location,
                address: req.query.address
            })
                        
        }) 
    })
})

app.get('/products', (req, res) =>{
    if(!req.query.search){
        return res.send({
            error:'you must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404', {
        title: 'Help articel not found'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title:'Page not found..'
    })
})

//runing server is asyncronous
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})