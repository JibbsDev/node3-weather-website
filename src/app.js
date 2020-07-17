const path = require('path')
const express = require('express');
const hbs = require('hbs') // to configure partials frequently used html shit
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

// __dirname is a property of node iife that is used to produce the current file on the root pc
// __filename is a property of node iife  that is used to produce the current path

const app = express()

//Path  creation for Express confing 
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views') // path creation for hbs
const partialsPath = path.join(__dirname, '../templates/partials')  

//install npm i hbs for dynamic pages
// use set to set hbs at view engine
app.set('view engine', 'hbs')
app.set('views',viewsPath) // path for hbs (not compulsory if folder usign views folder)
hbs.registerPartials(partialsPath)

// setup static directory to serve static pages
app.use(express.static(publicDirectory))



// think about this like app is the website 
// app.com is the root route
// app.com/help is a route
// app.com/about is another route

//                                      app.get(route,function)
//                                      app.get('', (req, res) => {})
        
        // lets configure what the server to should with a get request could send back html, json
        //  takes two arguments: 
        //                        1) the Route
        //                        2) the function
  
        
//call render to use hbs view 
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Tobi Ogunleye'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Tobi Ogunleye'
    })
})
app.get('/help',(req, res)=>{
    res.render('help',{
        title:'Help page',
        name: 'Tobi Ogunleye'
    })
})
app.get('/help/*',(req,res) => {
    res.render('404',{
        name:'Tobi Ogunleye',
        title: '404 Help',
        errorMessage: 'Help article not found'
    })
})

app.get('/weather',(req,res) =>{

    if(!req.query.address){
       return res.send({
            error: 'Please provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={}) => {
    
        if(error) return res.send({'Error': error});
        //if(data)console.log('Data:',data)
        forecast(longitude,latitude, (error, forecastData) => {
       
            if(error)return res.send({'Error': error})
            if(location)res.send({location,forecast:forecastData,address:req.query.address})
          })  
        })
  
})
app.get('/products',(req , res)=>{  // query
    if (!req.query.search) { //if query doesnt exist
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    res.send({
        products: []
    })
})
app.get('*',(req,res) => {
    res.render('404',{
        name:'Tobi Ogunleye',
        title: '404 page',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port:3000')
})// starts the server common development port 