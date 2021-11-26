import {game_state, get_warnings } from './model'

let warnings = {}
async function init() {
    try {warnings = await fetch('http://localhost:8080/warnings').then(res => res.json())   }
    catch (err) {
      console.log(err)
    }
     }
    init()

export function reduce(model, action) {

    
    switch (action.type) {
            case 'polling':
            console.log("In reducer")
            console.log(model)
            return game_state(model, action)

            case 'keepUpdating':
            console.log("In keepUpdating")
            init()
            console.log(warnings)
            return get_warnings(warnings, action)
            
        default:
            console.log("Reducer Default")
            console.log(action.type)
            return model
    }
}