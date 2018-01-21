export default function userReducer (state={
  isLoggedIn: false,
  username: '',
  userId: '',
  logId: '',
}, action) {
  switch (action.type) {
    case 'LOGIN': {
      console.log(action.response)
        return {
          ...state,
          isLoggedIn: true,
          username: action.username,
          userId: action.userId,
          logId: action.logId,
        }
        break;
      }
    case 'LOGOUT': {
      console.log('logout user')
      return {
        ...state,
        isLoggedIn: false,
        username: '',
        userId: '',
        logId: '',
      }
      break;
    }
  }
  return state;
}
