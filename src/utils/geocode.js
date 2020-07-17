const request = require('request');
const { builtinModules } = require('module');

const geocode = (address,callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1Ijoib29vZ3VubGUiLCJhIjoiY2tjbDZ0dnR1MjJwajJ1bzVyMHgxZWE0eCJ9.IIs-79My3NtB3OqG4nNF0w&limit=1"

    request({url, json:true},(error, {body}) => {
        if(error){ // checks lowlevel errors like connectivity
            callback('Unable to connect to location services!', undefined);
        } else if (body.features.length === 0){ //checks query errors like wrong search etc or api down
            callback('Unable to find location. Try another search.', undefined)
        } else{
            callback(undefined,{
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }

    })
}

module.exports = geocode

//error checking
//     // theres 2 types of erros: low level erros usually get returned errorarg
//     //                           other api errors get returned into the response with a code and reason
//     //                           so one has to check that the response isnt an error
