const model = (warnings) => {
    const Warning = () => warnings
        .sort((a, b) => (a.time > b.time) ? -1 : 1)
}

export function game_state({ warnings }) {
    return {
        warnings,
        accept: ({ visit_game }) => { if (visit_game) return visit_game({ warnings }) }
    }
}

export function get_model({ warnings }) {
    return {
        warnings,
        accept: ({ visit_pre_game }) => { if (visit_pre_game) return visit_pre_game({ warnings }) }
    }
}