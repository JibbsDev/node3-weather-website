const request = require('request');

const forecast = (longitude,latitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=941c778a6b6fdb8421ecfe2a0ce1ce51&query='+longitude+','+latitude+'&units=m'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to location services!',undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{

            const weath_desc = body.current.weather_descriptions[0]
            const temp =  body.current.temperature
            const feelsLike = body.current.feelslike
            const message = weath_desc + '. It is currently '+ temp +' degrees out. It feels like ' + feelsLike;
            callback(undefined,message)
        }
    })
    
}

module.exports = forecast;