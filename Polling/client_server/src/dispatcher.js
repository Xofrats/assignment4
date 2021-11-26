export const server_dispatch = action => {
    switch(action.type) {
      case 'concede': {
        return { ...action }
      }
      case 'polling': {
        console.log("server polling")
        console.log(action)
        return { action }
      }

      case 'subscribe': {
        return "subscribe"
      }

      case 'unsubscribe': {
        return "unsubscribe"
      }

      
      default:
          console.log("SERVER DISPATCH DEFAULT")
        return action
    }
  }
  
  export const create_action = server_msg => {
    console.log("server_msg")
      console.log(server_msg)

      return { type: 'polling', server_msg }
  }