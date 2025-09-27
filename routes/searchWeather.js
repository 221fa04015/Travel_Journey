
const express = require('express');
const router = express.Router();
const axios = require('axios');


// Handle weather search
router.post('/search_weather', async (req, res) => {
    const { city } = req.body;

    try {
        const apiKey = "a1a98af13e178cb79dc5c5dbd6003e8f"; 
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`, {
            params: {
                q: city,
                units: 'metric',
                appid: apiKey
            }
        });

        const weatherData = {
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon
        };

        res.render('weatherDetails', { weatherData, city });
    } catch (error) {
        res.render('weatherDetails', { weatherData: null, city, error: 'Unable to fetch weather data. Please try again.' });
        console.error("Error fetching weather data:", error.message);
        res.render('weatherDetails', { weatherData: null, city });
    }
});

module.exports = router;