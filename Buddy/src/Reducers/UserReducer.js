export default function userReducer (state={
  isLoggedIn: false,
  username: '',
  password: ''
}, action) {
  switch (action.type) {
    case 'LOGIN': {
        return {
          ...state,
          isLoggedIn: true,
          username: action.username,
          password: action.password
        }
        break;
      }
    case 'LOGOUT': {
      return {
        ...state,
        isLoggedIn: false,
        username: '',
        password: ''
      }
      break;
    }
  }
  return state;
}
