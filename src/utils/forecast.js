//const request = require('request')

// import request from 'request'
// import axios from 'axios'

const axios = require('axios')

const foreCast = (latitude,longitude,place_name,callback)=>{
    const access_key = '8d5718b63636e15660dc5255e516cb94'
    const query = `${latitude},${longitude}`
    //const query = `${parseFloat(latitude)},${parseFloat(longitude)}`
   // console.log('Query = ',query)
    const baseUrl = 'http://api.weatherstack.com/current?'
    const units = 'f';
    const url = baseUrl + 'access_key=' + access_key + '&query=' + query + '&units' + units

    //console.log('forecast url = ',url)
   // console.log(chalk.bgWhiteBright('Weather URL = ',url));
    /*
    request({url:url,json:true},(err,res)=>{
        if(err){
            callback('Unable to connect weather Services.',undefined)
        }else if(res.body.error){
            callback('Unable to find location. Try another search.',undefined)
        }else{
            callback(undefined,{
                weather:res.body.current.weather_descriptions[0],
                temperature:res.body.current.temperature,
                feelslike:res.body.current.feelslike
            })
        }
    })
    */
      //with Distructuring
      /*
    request({url,json:true},(err,{body})=>{
        if(err){
            callback('Unable to connect weather Services.',undefined)
        }else if(body.error){
            callback('Unable to find location. Try another search.',undefined)
        }else{
            callback(undefined,{
                weather:body.current.weather_descriptions[0],
                temperature:body.current.temperature,
                feelslike:body.current.feelslike
            })
        }
    })
    */

    axios.get(url)
    .then((res)=>{
        if (res.err){
            callback('Unable to find location. Try another search.',undefined)
        }else{
            callback(undefined,{
                weather:res.data.current.weather_descriptions[0],
                temperature:res.data.current.temperature,
                feelslike:res.data.current.feelslike
            })
        }
    })
    .catch((err)=>{
        callback('Unable to connect weather Services.',undefined)
    })

}

//module.exports = foreCast;

//export { foreCast }

module.exports = foreCast