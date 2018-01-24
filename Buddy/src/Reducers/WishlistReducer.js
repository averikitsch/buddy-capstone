export default function reducer(state={
  wishlist:[],
  selectedWish: null,
}, action) {

  switch(action.type) {
    case "ADD_WISHLIST": {
      const ids = state.wishlist.map((obj) => {
        return obj.id
      })
      let nextId;
      if (ids.length == 0) {
        nextId = 1;
      } else {
        nextId = Math.max(...ids) + 1;
      }
      const newLog = action.payload;
      newLog.id = nextId;
      return {
        ...state,
        wishlist: [...state.wishlist, newLog],
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
    case "SELECT_WISH": {
      return {
        ...state,
        selectedWish: action.payload,
      }
    }
    case "DESELECT_WISH": {
      return {
        ...state,
        selectedWish: null,
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
      return {
        wishlist:[]
      }
      break;
    }
  }
  return state;
}
