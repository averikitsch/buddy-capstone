export default function reducer(state={
  logs: [],
  selectedLog: null,
  loaded: true,
}, action) {

  switch(action.type) {
    case "ADD_LOG": {
      console.log('add log reducer')
      const ids = state.logs.map((obj) => {
        return obj.id
      })
      let nextId;
      if (ids.length == 0) {
        console.log('make id = 1')
        nextId = 1;
      } else {
        console.log(ids)
        nextId = Math.max(...ids) + 1;
      }
      const newLog = action.payload;
      newLog.id = nextId;
      console.log(newLog)
      return {
        ...state,
        logs: [...state.logs, newLog],
      };
    }
    case "DELETE_LOG": {
      console.log('delete log reducer')
      console.log(action.payload)
      return {
        ...state,
        logs: state.logs.filter(log => log.id !== action.payload.id)
      };
    }
    case "UPDATE_LOG": {
      console.log('update')
      const newLogs = state.logs.filter(log => log.id !== action.payload.id)
      newLogs.push(action.payload)
      return {
        ...state,
        logs: newLogs,
      }
    }
    case "SELECT_LOG": {
      console.log('select log');
      return {
        ...state,
        selectedLog: action.payload,
      }
    }
    case "DESELECT_LOG": {
      console.log('deselect log');
      return {
        ...state,
        selectedLog: null,
      }
    }
    case 'LOGIN': {
      const data = action.logs ? action.logs : [];
      return {
        ...state,
        logs: data,
      }
      break;
    }
    case 'LOAD_LOGS': {
      return {
        ...state,
        loaded: true,
      }
      break;
    }
    case 'LOGOUT': {
      console.log('logout logs')
      return {
        logs: [],
        selectedLog: null,
        loaded: false,
      }
      break;
    }
  }

  return state;
}
