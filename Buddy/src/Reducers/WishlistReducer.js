export default function reducer(state={
  wishlist:[]
}, action) {

  switch(action.type) {
    case "ADD_WISHLIST": {
      console.log('trying')

      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };
    }
    case "DELETE_WISHLIST": {
      return {
        ...state,
        wishlist: state.wishlist.filter(wishlist => wishlist !== action.payload)
      };
    }
    case "UPDATE_WISHLIST": {
      const newWishs = state.wishlist.filter(log => log.id !== action.payload.id)
      newWishs.push(action.payload)
      return {
        ...state,
        wishlist: newWishs,
      }
    }
    case 'LOGIN': {
      const data = action.wishlist ? action.wishlist : [];
      return {
        ...state,
        wishlist: data,
      }
    }
    case 'LOGOUT': {
      console.log('logout wish')
      return {
        wishlist:[]
      }
      break;
    }
  }
  return state;
}
