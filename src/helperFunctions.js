const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoicmFjaGl0Mjg3IiwiYSI6ImNreGVwYmdxaDIwa3gybm8xdXF2OXBnODQifQ.qGF89LRNkVNxXw4Bzoyymw&limit=1`;
  request({ url: url, json: true }, (e, {body}) => {
    if (e) {
      callback(
        `Unable to connect to the Geocoding Service! Please check your connection!`,
        undefined
      );
    } else if (body.features.length === 0) {
      callback(`Please provide a valid query!`, undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        place: body.features[0].place_name,
      });
    }
  });
};

const convertGeoToFore = (a, b, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=202669b2bfdbc0da6c9eb81f31161a71&query=${a},${b}`;
  request({ url: url, json: true }, (e, r) => {
    if (e) {
      callback("Please check your internet connection!", undefined);
    } else if (r.body.error) {
      callback(`Please enter a valid query!`, undefined);
    } else {
      callback(undefined, {
        temperature: r.body.current.temperature,
        howItIs: r.body.current.weather_descriptions[0],
        precip: r.body.current.precip,
      });
    }
  });
};

module.exports = {
  geocode: geocode,
  convertGeoToFore: convertGeoToFore,
};
