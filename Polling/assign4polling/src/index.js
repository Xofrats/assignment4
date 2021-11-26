import ReactDOM from 'react-dom';
import './index.css';
import model from './model.js'
import view from './view.js'
import store from './store.js'
import dispatcher from './dispatcher.js'
import dispatcher_server from './dispatcher_polling';

async function init() {
  try {
    const weather_res = await fetch('http://localhost:8080/data')
    const weather = await weather_res.json()
    const forecast = await fetch('http://localhost:8080/forecast').then(res => res.json())
    const warning = await fetch('http://localhost:8080/warnings').then(res => res.json())
    console.log("Warnings!")
console.log(warning)
    const theModel = model(weather, forecast, warning.warnings)
    let renderer = dom => ReactDOM.render(dom, document.getElementById('root'))
    let theDispatcher
    let theServerDispatcher
    const theView = view(() => theDispatcher)
    const theStore = store(theModel, theView, renderer)
    theDispatcher = dispatcher(theStore)
    theServerDispatcher = dispatcher_server(theDispatcher)
    renderer(theView(theModel))
  } catch (err) {
    console.log(err)
  }
}

init()