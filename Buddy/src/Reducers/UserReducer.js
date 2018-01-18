export default function userReducer (state={
  isLoggedIn: false,
  username: '',
  userId: '',
}, action) {
  switch (action.type) {
    case 'LOGIN': {
      console.log(action.response)
        return {
          ...state,
          isLoggedIn: true,
          username: action.username,
          userId: action.userId,
          logs: action.response.logs,
          wishlist: action.response.wishlist,
        }
        break;
      }
    case 'LOGOUT': {
      return {
        ...state,
        isLoggedIn: false,
        username: '',
        userId: '',
        password: '',
      }
      break;
    }
  }
  return state;
}
