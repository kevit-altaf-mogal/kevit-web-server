const path = require('path')
const express = require('express');
const hbs = require('hbs');
const { BADHINTS } = require('dns');

const geoCode = require('./utils/geocode')
const foreCast = require('./utils/forecast')
/*
import path from 'path'
import express from 'express'

import { URL } from 'url'; // in Browser, the URL in native accessible on window
const __filename = new URL('', import.meta.url).pathname;
// Will contain trailing slash
const __dirname = new URL('.', import.meta.url).pathname;
// console.log(__dirname)
// console.log(__filename)

//Setup Static Path in Express
//console.log(path.join(__dirname,'../public'))
const publicDirectoryPath = path.join(__dirname,'../public/');
console.log(publicDirectoryPath)
*/
console.log('git testing')
const app = express()

const port = process.env.PORT || 3000

//Setup Static Path in Express

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


/*
app.get('',(req,res)=>{
   // console.log(req);
    res.send('<h1>Weather</h1>')
})

app.get('/help',(req,res)=>{
    res.send([{
        name:'altaf',
        age:'38'
    },{
        name:"Test"
    }])
})

app.get('/about',(req,res)=>{
    res.send('<h1>About</h1>')
})

*/

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Altaf'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Altaf'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Altaf'
    })
})

// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: "ForeCast",
//         location: "Rajkot"
//     })
// })

// app.get('/weather', (req, res) => {
//     if (!req.query.address){
//         return res.send({
//             error:'You must provide an address.'
//         })
//     }
//     res.send({
//         forecast: "ForeCast",
//          location: "Rajkot",
//         address : req.query.address
//     })
// })

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error:'You must provide an address.'
        })
    }
    geoCode(req.query.address, (err, {latitude,longitude,place_name} = {}) => {
        if (err) {
            //console.log('Error = ', err);
            return res.send({
                error : err
            })
        } else {
            //console.log('Data = ', data);
            foreCast(latitude,longitude,place_name,(err,forecastData)=>{
                if (err){
                 //   return console.log(err);
                    return res.send({
                        error : err
                    })
                }
               // console.log(forecastData);
                res.send({
                    forecast: "ForeCast",
                     location: place_name,
                    address : req.query.address,
                    forecastData:forecastData
                })
            })
    
        }
    });
   
})

//app.get('/products/:id/:n',(req,res)=>{
//app.get('/products:id',(req,res)=>{
//app.get('/products', (req, res) => {
app.get('/products/:id/nnn/:n/hhjh',(req,res)=>{
    console.log(req.params);
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    //     console.log('id=',req.params.id)
    //    // console.log('n=',req.params.n)
    //     console.log('req=',req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Altaf',
        errorMessage: 'Help article not found.'
    })
})

// app.use((req,res)=>{
//     console.log('req',req)
//     res.send('404')
// })

//wild card characters
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Altaf',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})


/*
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon src/app.js -e js,hbs",
    "start-server": "nodemon src/app.js -e js,hbs"
  }
*/