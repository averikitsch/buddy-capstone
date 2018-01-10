export default function reducer(state={
  wishlist:[
    {id: 1, name: 'LA Confidential', brand: "Dawg Star", product: "Flower", date:'01-02-2018'},
  ]
}, action) {

  switch(action.type) {
    case "ADD_WISHLIST": {
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };
    }
    case "DELETE_WISHLIST": {
      return {
        ...state,
        wishlist: state.wishlist.filter(wishlist => log.id !== action.payload)
      };
    }
    case "UPDATE_WISHLIST": {
      return state;
    }
  }
  return state;
}
