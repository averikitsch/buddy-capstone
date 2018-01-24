export default function userReducer (state={
  isLoggedIn: false,
  username: '',
  userId: '',
  logId: '',
}, action) {
  switch (action.type) {
    case 'LOGIN': {
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
