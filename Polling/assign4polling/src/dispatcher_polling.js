import { ajax } from 'rxjs/ajax'
import { map, of, share } from 'rxjs'

const start_game = (httpCall) => {
    console.log("in start game")
    console.log(httpCall)
    const model = ajax(httpCall)
        .pipe(map(res => res.response))
        .pipe(share())
}

export const dispatcher_server = action => {
    switch (action.type) {
        case 'polling': {
            console.log("polling from poll url")
            return ajax.getJSON('http://localhost:8080/warnings')
      .pipe(map(warnings => ({type: 'polling', warnings})))
        }

        default:
            console.log("Default")
            console.log(action.type)
            return of(action)
    }
}