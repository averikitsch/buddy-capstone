export default function searchReducer(state={
  found: null,
  allStrains: ["Afpak", "African", "Afternoon Delight", "Afwreck", "Agent Orange", "Agent Tangie", "Alaska", "Alaska Thunder Grape", "Alaskan Ice", "Alaskan Thunder Fuck", "Albert Walker", "Alchemy", "Alf", "Alice in Wonderland", "Alien Abduction", "Alien Apparition", "Alien Asshat", "Alien Bubba", "Alien Dawg",
  ],
  loaded: false,
}, action) {
  switch(action.type) {
    case "FIND_ITEM": {
      console.log('search reducer')
      return {
        ...state,
        found: action.payload,
      }
      break;
    }
    case "GET_ALL": {
      if (state.loaded || action.payload === undefined) {
        return state
      } else {
        return {
          ...state,
          allStrains: action.payload,
          loaded: true,
        }
        break;
      }

    }
  }
  return state;
}
