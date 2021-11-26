export const model = (warnings) => {

    const addWarning = w => model(warnings.concat(w))

    const MakeWarning = w => model([w])

    const Warning = () =>  warnings
    .filter(w => w.severity > 0)
    .sort((a, b) => (a.id > b.id) ? -1 : 1)

    return {addWarning, MakeWarning, Warning}
}

export function pre_game_state({ games }) {
    return { games, 
             accept: ({ visit_pre_game }) => { if (visit_pre_game) return visit_pre_game({ games }) }
    }
}

export function game_state({ player, game }) {
    return { player, game,
             accept: ({ visit_game }) => { if (visit_game) return visit_game({ player, game }) }
    }
}

export function get_model() {
    return {
        accept: ({ start_screen }) => { if (start_screen) return start_screen() }
    }
}

export function update_model(action) {
    console.log("IN UPDATE MODEL")
    if(action.server_msg.id && action.server_msg.severity > 0){
        console.log("IN ADD WARNING")
        console.log(action.server_msg)
        let newModel = model().MakeWarning(action.server_msg)

        return {
            newModel,
            accept: ({ data_screen }) => { if (data_screen) return data_screen({newModel}) }
        }
    } else if(action.server_msg.warnings){
        console.log("IN ELSE")
        console.log(action.server_msg)

        let newWarnings = action.server_msg.warnings.filter(w => w.severity > 0)

    if(newWarnings > 0){
        console.log("MULTIPLE WARNING")
        console.log(newWarnings)
        let newModel = model(action.server_msg.warnings)

        return {
            newModel,
            accept: ({ data_screen }) => { if (data_screen) return data_screen({newModel}) }
        }
    }

    else{
        console.log("Empty!?")
        return {
            accept: ({ start_screen }) => { if (start_screen) return start_screen() }
        }
    }
    } else{
        console.log("Empty!?")
        return {
            accept: ({ start_screen }) => { if (start_screen) return start_screen() }
        }
    }

    

    
    
    
}
