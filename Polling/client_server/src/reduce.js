import {update_model } from './model'

export function reduce(model, action) {

    switch (action.type) {
            case 'polling':
            console.log("In reducer")
            console.log(action)
            return update_model(action)

            case 'subscribe':
                console.log("In reducer sub")
                return { ...model, message: 'subscribe' }

                case 'unsubscribe':
                    console.log("In reducer sub")
                    return { ...model, message: 'unsubscribe' }
            
        default:
            console.log("Reducer Default")
            console.log(action.type)
            return model
    }
}