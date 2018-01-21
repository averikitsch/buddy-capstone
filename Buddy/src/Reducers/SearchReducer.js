import axios from 'axios';

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
      // console.log('get all reducer');
      // console.log(state.loaded, action.payload);
      if (state.loaded || action.payload === undefined) {
        // console.log('dont do it!')
        return state
      } else {
        // console.log(action.payload);
        // console.log('fetch data')
        return {
          ...state,
          allStrains: action.payload,
          loaded: true,
        }
        break;
      }
      // let names = await axios.get(`http://strainapi.evanbusse.com/5QPNwCQ/strains/search/all`)
      //   .then((response) => {
      //     names = Object.keys(response.data);
      //     console.log(names);
      //     return {
      //       ...state,
      //       allStrains: names,
      //     }
      //   })
    }
    // return state;
  }
  return state;
}
