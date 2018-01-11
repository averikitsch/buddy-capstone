export default function reducer(state={
  logs: [
      {name: 'Lemon Drop', brand: "Dawg Star", product: "Flower", date:'01-01-2018'},
      { name: 'GG #4', brand: "Dawg Star", product: "Flower", date:'01-01-2018'},
      {name: 'LA Confidential', brand: "Dawg Star", product: "Flower", date:'01-02-2018'},
      {name: 'Frosted Flakes', brand: "Dawg Star", product: "Flower", date:'01-03-2018'},
      // {id: 5, name: 'Blueberry', brand: "Dawg Star", product: "Flower", date:'01-03-2018'},
      // {id: 6, name: 'Island Breeze', brand: "Western Cultured", product: "Flower", date:'01-03-2018'},
      // {id: 7, name: 'Kraken Black Pepper', brand: "Western Cultured", product: "Flower", date:'01-04-2018'},
      // {id: 8, name: 'PermaFrost', brand: "Western Cultured", product: "Flower", date:'01-04-2018'},
    ],
}, action) {

  switch(action.type) {
    case "ADD_LOG": {
      console.log('add log reducer')
      return {
        ...state,
        logs: [...state.logs, action.payload],
      };
    }
    case "DELETE_LOG": {
      console.log('delete log reducer')
      return {
        ...state,
        logs: state.logs.filter(log => log !== action.payload)
      };
    }
    case "UPDATE_LOG": {
      const { logs } = state;
      const newLogs = logs.map((item) => {
        if(item !== action.payload) {
          return item;
        }
        return action.payload;
      });
      return {
        ...state,
        logs: newLogs,
      }
    }
    return state;
  }
  return state;
}
