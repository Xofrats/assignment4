export const model = (warnings) => {

    const Warning = () =>  warnings
    .sort((a, b) => (a.id > b.id) ? -1 : 1)

    

    return {Warning}
}

export function game_state({ init_warnings }) {
    let newModel = model(init_warnings.warnings)
    return {
        init_warnings, newModel,
        accept: ({ visit_game }) => { if (visit_game) return visit_game({ init_warnings, newModel }) }
    }
}

export function get_warnings({ warnings }) {
    console.log("IN MODEL")
    console.log(warnings)
    let newModel = model(warnings)
    return {
        newModel,
        accept: ({ warning_list }) => { if (warning_list) return warning_list({ newModel }) }
    }
}

export function get_model({ init_warnings }) {
    let newModel = model(init_warnings.warnings)
    return {
        init_warnings, newModel,
        accept: ({ visit_pre_game }) => { if (visit_pre_game) return visit_pre_game({ init_warnings, newModel }) }
    }
}