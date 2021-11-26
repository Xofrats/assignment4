// eslint-disable-next-line
export default store => async ({ type, ...params }) => {

    const weather_res = await fetch('http://localhost:8080/data/')
    const weather = await weather_res.json()
    const forecasts = await fetch('http://localhost:8080/forecast').then(res => res.json())

    switch (type) {
        case 'copenhagenWeather':
            const weatherC = await fetch('http://localhost:8080/data/Copenhagen').then(res => res.json())
            const forecastC = await fetch('http://localhost:8080/forecast/Copenhagen').then(res => res.json())
            store({ type, ...params, weatherC, forecastC })
            break;

        case 'aarhusWeather':
            const weatherAa = await fetch('http://localhost:8080/data/Aarhus').then(res => res.json())
            const forecastAa = await fetch('http://localhost:8080/forecast/Aarhus').then(res => res.json())
            store({ type, ...params, weatherAa, forecastAa })
            break;

        case 'horsensWeather':
            const weatherH = await fetch('http://localhost:8080/data/Horsens').then(res => res.json())
            const forecastH = await fetch('http://localhost:8080/forecast/Horsens').then(res => res.json())
            store({ type, ...params, weatherH, forecastH })
            break;

        case 'fromDateToDate':
            store({ type, ...params })
            break;

        case 'updateLatest':
            store({ type, ...params, weather, forecasts })
            break;

        case 'updateAll':
            store({ type, ...params, weather, forecasts })
            break;

        case 'add':
            const weatherPrompt = window.prompt('Weather Data')
            const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
            const weatherPost = await fetch('http://localhost:8080/data',
                {
                    method: 'POST',
                    body: JSON.stringify({ weatherPrompt }),
                    headers
                }).then(res => res.json())
            store({ type, ...params, weatherPost })
            break;

            case 'polling':
            store({ type, ...params, weather, forecasts })
            break;

        default:
    }
}