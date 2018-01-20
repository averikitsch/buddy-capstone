export default function reducer(state={
  wishlist:[
    {id: 1, name: 'Mochi gelato', brand: "Dawg Star", product: 1, date:'01-01-2018', duration: 1, ranking: 5, activity: 3, type: 'sativa', flavors: { spicy: true, sweet: false, sour: false, earthy: false }, quantity: 1},
  ]
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
      return {
        ...state,
        wishlist: action.wishlist,
      }
    }
    case 'LOGOUT': {
      console.log('logout wish')
      return {}
      break;
    }
  }
  return state;
}
