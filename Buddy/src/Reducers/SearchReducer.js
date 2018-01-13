export default function searchReducer(state={
  found: null,
}, action) {
  switch(action.type) {
    case "FIND_ITEM": {
      console.log('search reducer')
      return {
        ...state,
        found: action.payload,
      };
    }
    return state;
  }
  return state;
}
