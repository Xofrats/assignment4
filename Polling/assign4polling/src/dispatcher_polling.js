const dispatcher_server = (dispatcher) => {

const call_server = (url, init) =>
    fetch(url, init)
        .then(res => res.ok ? res.json() : Promise.reject(res.status))

const wait_for = (url, condition) => {
    const loop = async (resolve, reject) => {
        try {
            const res = await fetch(url)
            const json = await res.json()
            if (res.ok && condition(json))
                resolve(json)
            else
                setTimeout(loop, 100, resolve, reject)
        } catch (error) {
            reject(error)
        }
    }
    return new Promise(loop)
}

const check_warnings = async (dispatch) => {
    const updater = async original_warnings => {
      const response = await fetch('http://localhost:8080/warnings')
      const json = await response.json()
      if (json.warnings.length > original_warnings.length) {
        console.log(json)
       await dispatcher()({ type: 'polling', param: response.warnings })

      }
      setTimeout(updater, 100, json.warnings)
    }
    const res = await fetch('http://localhost:8080/warnings')
    const { moves } = await res.json()
    updater(moves)
  }
}

export default dispatcher_server