export default function reducer(state={
  logs: [
      {id: 1, name: 'Lemon Drop', brand: "Dawg Star", product: "Flower", date:'01-01-2018'},
      {id: 2, name: 'GG #4', brand: "Dawg Star", product: "Flower", date:'01-01-2018'},
      {id: 3, name: 'LA Confidential', brand: "Dawg Star", product: "Flower", date:'01-02-2018'},
      {id: 4, name: 'Frosted Flakes', brand: "Dawg Star", product: "Flower", date:'01-03-2018'},
      {id: 5, name: 'Blueberry', brand: "Dawg Star", product: "Flower", date:'01-03-2018'},
      {id: 6, name: 'Island Breeze', brand: "Western Cultured", product: "Flower", date:'01-03-2018'},
      {id: 7, name: 'Kraken Black Pepper', brand: "Western Cultured", product: "Flower", date:'01-04-2018'},
      {id: 8, name: 'PermaFrost', brand: "Western Cultured", product: "Flower", date:'01-04-2018'},
    ],
    newLog: {},
}, action) {

  switch(action.type) {
    case "ADD_LOG": {
      return {
        ...state,
        logs: [...state.logs, action.payload],
      };
    }
    case "DELETE_LOG": {
      return {
        ...state,
        logs: state.logs.filter(logs => log.id !== action.payload)
      };
    }
    case "NEW_LOG": {
      return {
        ...state,
        newLog: action.payload,
      }
    }
    case "UPDATE_LOG": {
      return state;
    }
  }
  return state;
}
