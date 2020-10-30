const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibmVzdG9yLXBhbnUiLCJhIjoiY2tnZWpibXF3MWJoODJ0bWlqOWp2c21neSJ9.1oBN--CN8akl94GiKZB5tQ&language=es&limit=1`;

    request({ url, json: true }, (error, { body = {} }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        }
        else if (body.features == 0) {
            callback('Couldn\'t find location!', undefined);
        }
        else {
            const geoResult = body.features[0];
            callback(undefined, {
                latitude: geoResult.center[1]
                , longitude: geoResult.center[0]
                , location: geoResult.place_name
            })
        }
    })
}

module.exports = geocode;