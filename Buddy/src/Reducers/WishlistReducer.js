export default function reducer(state={
  wishlist:[
    {name: 'Mochi gelato', brand: "Dawg Star", product: 1, date:'01-01-2018', duration: 1, ranking: 5, activity: 3, type: 'sativa', flavors: { spicy: true, sweet: false, sour: false, earthy: false }, quantity: 1},
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
      return state;
    }
  }
  return state;
}
