// eslint-disable-next-line
export default (init_model, view, renderer) => {
    let model = init_model

    function reducer(action, model) {
        const { weather, forecasts} = action
        switch (action.type) {
            case 'copenhagenWeather':
                const { weatherC, forecastC } = action
                return model.CityWeatherData(weatherC, forecastC)

            case 'aarhusWeather':
                const { weatherAa, forecastAa } = action
                return model.CityWeatherData(weatherAa, forecastAa)

            case 'horsensWeather':
                const { weatherH, forecastH } = action
                return model.CityWeatherData(weatherH, forecastH)

            case 'fromDateToDate':
                return model.TimeWeatherData(action.param, action.params)

            case 'add':
                return model.addWeatherData(weather)

            case 'updateLatest':
                return model.updateLatest(weather, forecasts)

            case 'updateAll':
                return model.updateModel(weather, forecasts)

            case 'polling':
            return model.updateModel(action.param)

            default:
                return model
        }
    }

    return action => {
        model = reducer(action, model)
        renderer(view(model))
    }
}