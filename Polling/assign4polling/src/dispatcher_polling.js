import { ajax } from 'rxjs/ajax'
import { interval, of, merge} from 'rxjs'
import { map, concatMap, share } from 'rxjs/operators'

const poll_url = url => 
interval(2000)
.pipe(concatMap(() => ajax.getJSON(url)))

const poll_game = game =>
poll_url(`http://localhost:8080/warnings/`, game)

const start_game = (httpCall) => {
    const game = ajax(httpCall)
    .pipe(map(res => res.response))
    .pipe(share())

    const opponent_moves = game.pipe(concatMap(poll_game))

    return merge(game, opponent_moves).pipe(map(game => ({type: 'keepUpdating', game})))
  }
  

export const dispatcher_server = action => {
    switch (action.type) {
        case 'polling': {
    return start_game({url: 'http://localhost:8080/warnings'})
        }

        default:
            console.log("dispatcher Default")
            console.log(action.type)
            return of(action)
    }
}