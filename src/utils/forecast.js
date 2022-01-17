
const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=ae8bc1ff5272f383bd148e96235e6843&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=f'

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find forecast!', undefined)
    } else {
      console.log(body)
      const { current } = body
      const { temperature, feelslike, weather_descriptions, humidity } = current
      const forecast = weather_descriptions[0] + '. It is currently ' + temperature + ' degrees out with ' + humidity + '% humidity. It feels like ' + feelslike + ' degrees out.';
      callback(undefined, forecast)
    }
  })

}

// forecast(-75.7088, 44.1545, (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
//   })

module.exports = forecast