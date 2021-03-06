const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=3f2e04f6c9c87327bac1d9a9f959ca9e&query=${latitude},${longitude}&units=f`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Could not connect to Weather service!', undefined);
        }
        else if (body.error) {
            callback('Could not get weather from location!', undefined);
        }
        else {
            const currentWeather = body.current;
            callback(
                undefined
                , {
                    description: `${currentWeather.weather_descriptions[0]} at ${currentWeather.observation_time}. The temperature is ${currentWeather.temperature} °F, feels like ${currentWeather.feelslike} °F`
                    ,
                    weatherIcon: currentWeather.weather_icons[0]
                }
            )
        }
    });
}

module.exports = forecast;