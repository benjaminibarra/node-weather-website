const request = require('request')

const geocode = (address, callback) => {
  const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmVuam9pYmFycmEiLCJhIjoiY2t5aTEzZXZ1MTZrejJ2cG1kdWgwNGVhcSJ9.n8rA3zGu0LasOuqRInikTQ&limit=1'

  request({ url, json: true }, (error, { body } = {}) => {
    if (!body || error) {
      callback('Unable to connect to geocode service!', undefined)
    } else if (!body.features || body.features.length == 0) {
      callback('Unable to find location!', undefined)
    } else {
      const { features } = body
      const latitude = features[0].center[1]
      const longitude = features[0].center[0]
      const location = features[0].place_name
      const data = { latitude, longitude, location }
      callback(undefined, data)
    }
  })
}

module.exports = geocode