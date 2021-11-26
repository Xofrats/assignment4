import { game_state } from './model'

export function reduce(model, action) {
    switch (action.type) {
        case 'make-moves': {
            const { moves, inTurn, winner, stalemate } = action
            const { game, player } = model
            return game_state({
                game: Object.assign(moves.reduce(apply_move, game),
                    { inTurn, winner, stalemate }),
                player
            })
        }
        case 'polling':
            console.log("In reducer")
            return game_state(action)
            
        default:
            console.log("Default")
            console.log(action.type)
            return model
    }
}