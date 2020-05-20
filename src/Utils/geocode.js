const request = require('request')

const geocode = (address, callback) =>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoiYW5raXRyb290MTk5OCIsImEiOiJja2EwdW85Ymwwa2Q5M2VwbTRpY2ZqaTViIn0.GLMI_zuCOpjvDv28-aLCuA&limit=1"

    request({url, json: true}, (error, response) =>{
        if(error){
            callback('Unable to connect to location services!', undefined)
        } else if(response.body.message === 'Not Found'||response.body.features.length === 0){
            callback('Unable to find lication.Try another location', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode