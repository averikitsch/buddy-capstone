import { PURGE, REHYDRATE } from 'redux-persist';

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
          // logs: action.response.logs,
          // wishlist: action.response.wishlist,
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
    case 'PURGE': {
      return {}
      break;
    }
  }
  return state;
}
