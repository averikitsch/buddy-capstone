import axios from 'axios';

export default function searchReducer(state={
  found: null,
  allStrains: [],
}, action) {
  switch(action.type) {
    case "FIND_ITEM": {
      console.log('search reducer')
      return {
        ...state,
        found: action.payload,
      };
    }
    case "GET_ALL": {
      console.log('get all reducer');
      let names;
      axios.get(`http://strainapi.evanbusse.com/5QPNwCQ/strains/search/all`)
        .then((response) => {
          names = Object.keys(response.data);
          // console.log(names);
          return {
            ...state,
            allStrains: names,
          }
        })
        .catch((err) => {

        })
    }
    return state;
  }
  return state;
}
