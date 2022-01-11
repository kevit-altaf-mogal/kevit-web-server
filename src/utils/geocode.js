//const request = require('request');

// import request from 'request'

// import axios from 'axios'

const axios = require('axios')

//import request from 'request';
const geoCode = (address, callback) => {
    const access_token = 'pk.eyJ1IjoiYWx0YWZtb2dhbCIsImEiOiJja3kxM2hwZTIwN3UzMm5sbGI0cXl4MHdxIn0.NfsHXZs8zJKJ6h3SKM99eQ'
    const addressWithURIComponent = encodeURIComponent(address)
    const limit = 1
    //const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${addressWithURIComponent}.json?access_token=${access_token}&limit=${limit}`
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${addressWithURIComponent}.json`
    console.log('url = ', url)
    /*
     request({ url: url, json: true }, (err, res) => {
         if (err) {
             callback('Unable to connect location Services.', undefined)
         } else if (res.body.features.length <= 0) {
             callback('Unable to find location. Try another search.', undefined)
         } else {
             callback(undefined,{
                 latitude:res.body.features[0].center[1],
                 longitude:res.body.features[0].center[0],
                 place_name:res.body.features[0].place_name
             })
         }
     })
     */

    //with Distructuring
    /*
    request({ url, json: true }, (err, {body}) => {
        if (err) {
            callback('Unable to connect location Services.', undefined)
        } else if (body.features.length <= 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                place_name:body.features[0].place_name
            })
        }
    })
    */

    /*
    axios.get(url)
        .then((res) => {
            if (res.data.features.length <= 0) {
                callback('Unable to find location. Try another search.', undefined)
            } else {
                console.log('GEOCode Data ', res.data)
                callback(undefined, {
                    latitude: res.data.features[0].center[1],
                    longitude: res.data.features[0].center[0],
                    place_name: res.data.features[0].place_name
                })
            }
        })
        .catch((err) => {
            callback('Unable to connect location Services.', undefined)
        })

        */

    //Axios with get and with params 
    
    axios({
        method: 'get',
        url: url,
        params: {
            access_token: access_token,
            limit: limit
        },
        responseType: 'json'
    })
        .then((res) => {
           // console.log('res= ',res)
            if (res.data.features.length <= 0) {
                callback('Unable to find location. Try another search.', undefined)
            } else {
                //console.log('GEOCode Data ', res.data)
                callback(undefined, {
                    latitude: res.data.features[0].center[1],
                    longitude: res.data.features[0].center[0],
                    place_name: res.data.features[0].place_name
                })
            }
        })
        .catch((err) => {
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
              } else if (err.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(err.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', err);
              }
              console.log('config',err.config);
            callback('Unable to connect location Services.', undefined)
        })
        

    //Axios with post and with params 
    // axios({
    //     method: 'post',
    //     url: url,
    //     data: {
    //         access_token: access_token,
    //         limit: limit
    //     },
    //     responseType: 'json'
    // })

    /*
let payload = {
    access_token: access_token,
    limit: limit
};

axios.post(url,{access_token: access_token,limit: limit})
    .then((res) => {
        if (res.err) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            console.log('GEOCode Data ', res.data)
            callback(undefined, {
                latitude: res.data.features[0].center[1],
                longitude: res.data.features[0].center[0],
                place_name: res.data.features[0].place_name
            })
        }
    })
    .catch((err) => {
        console.log('err = ',err.response);
        callback('Unable to connect location Services.', undefined)
    })

    */
}


//export { geoCode }

module.exports = geoCode