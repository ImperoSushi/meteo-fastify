// API
const GEO_API = 'https://geocoding-api.open-meteo.com/v1';
const GEO_SEARCH = '/search?count=1&language=it&format=json';
const METEO_API = 'https://api.open-meteo.com/v1';
const METEO_FORECAST = '/forecast?current_weather=true';
const weatherRoute = async (fastify) => {
    // GET /meteo
    fastify.get('/meteo', async (request, reply) => {
        return reply.view('prove/weather/meteo.hbs');
    });
    // POST /meteo/api
    fastify.post('/meteo/api', async (request, reply) => {
        const body = request.body;
        let { city, lat, lon, country } = body;
        if (!city) {
            return reply.code(400).send({ error: 'Nessuna città inserita' });
        }
        if (city.length > 30) {
            city = city.substring(0, 30);
        }
        let latitude;
        let longitude;
        // Geocoding
        if (!lat || !lon) {
            const geoUrl = `${GEO_API}${GEO_SEARCH}&name=${encodeURIComponent(city)}`;
            const geoData = await fetch(geoUrl).then(r => r.json());
            if (!geoData.results || geoData.results.length === 0) {
                return reply.code(404).send({ error: 'Città non trovata' });
            }
            const result = geoData.results[0];
            country = result.country ?? "Sconosciuto";
            latitude = result.latitude;
            longitude = result.longitude;
        }
        else {
            latitude = Number(lat);
            longitude = Number(lon);
        }
        // Weather request
        const weatherUrl = `${METEO_API}${METEO_FORECAST}&latitude=${latitude}&longitude=${longitude}`;
        const weatherData = await fetch(weatherUrl).then(r => r.json());
        const weather = weatherData.current_weather;
        const weatherCodes = {
            0: "Cielo sereno ☀️",
            1: "Prevalentemente sereno 🌤️",
            2: "Parzialmente nuvoloso ⛅",
            3: "Coperto ☁️",
            45: "Nebbia 🌫️",
            48: "Nebbia con brina 🌫️❄️",
            51: "Pioviggine leggera 🌦️",
            53: "Pioviggine moderata 🌦️",
            55: "Pioviggine intensa 🌧️",
            56: "Pioviggine gelata leggera 🌧️❄️",
            57: "Pioviggine gelata intensa 🌧️❄️",
            61: "Pioggia leggera 🌦️",
            63: "Pioggia moderata 🌧️",
            65: "Pioggia intensa 🌧️💧",
            66: "Pioggia gelata leggera 🌧️❄️",
            67: "Pioggia gelata intensa 🌧️❄️",
            71: "Nevicata leggera 🌨️",
            73: "Nevicata moderata 🌨️❄️",
            75: "Nevicata intensa ❄️❄️",
            77: "Granelli di neve ❄️",
            80: "Rovesci leggeri 🌦️",
            81: "Rovesci moderati 🌧️",
            82: "Rovesci violenti ⛈️🌧️",
            85: "Rovesci di neve leggeri 🌨️",
            86: "Rovesci di neve forti 🌨️❄️",
            95: "Temporale ⛈️",
            96: "Temporale con grandine leggera ⛈️🌨️",
            99: "Temporale con grandine forte ⛈️❄️",
        };
        const description = weatherCodes[weather.weathercode] ?? "Condizione sconosciuta";
        return reply.send({
            city: city.charAt(0).toUpperCase() + city.slice(1),
            country: country ? country.charAt(0).toUpperCase() + country.slice(1) : "Sconosciuto",
            temperature: Math.round(weather.temperature),
            description,
            latitude,
            longitude,
        });
    });
};
export default weatherRoute;
