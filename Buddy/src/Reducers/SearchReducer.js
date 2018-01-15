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
      const names = fetchData();
      // console.log(names);
      // console.log(fetchData());
      return {
            ...state,
            allStrains: ["Afpak", "African", "Afternoon Delight", "Afwreck", "Agent Orange", "Agent Tangie", "Alaska", "Alaska Thunder Grape", "Alaskan Ice", "Alaskan Thunder Fuck", "Albert Walker", "Alchemy", "Alf", "Alice in Wonderland", "Alien Abduction", "Alien Apparition", "Alien Asshat", "Alien Bubba", "Alien Dawg",
            "Alien Dutchess", "Alien Hallucination", "Alien Inferno", "Alien Kush", "Alien OG", "Alien Reunion", "Alien Rift", "Alien Rock Candy", "Alien Sour Apple", "Alien Stardawg", "Alien Technology", "Aliens On Moonshine", "Allen Wrench", "Allkush", "Aloha", "Aloha Limone", "Alohaberry", "Alpha Blue", "Alpha Express", "Alpha OG",
             "Alpine Blue", "Alpine Star", "Ambrosia", "American Dream", "American Kush", "Americano", "Amnesia", "Amnesia Haze", "Ancient Kush", "Ancient OG", "Anesthesia", "Angel OG", "Animal Cookies", "Anonymous OG", "Ape Shit", "Apollo 11", "Apollo 13", "Appalachia", "Appalachian Power", "Apple Jack",
             "Apple Kush", "Appleberry", "Arctic Sun", "ArcticBlue", "Area 51", "Argyle", "Arjan's Strawberry Haze", "Arjan's Ultra Haze #1", "Armageddon", "Armagnac", "Ash", "Asian Fantasy", "Aspen OG", "Astroboy", "Athabasca", "Atmosphere", "Atomic Goat", "Atomic Northern Lights", "Atomical Haze", "Aurora Borealis",
              "Aurora Indica", "Avalon", "Avi", "Avi-Dekel", "Azure Haze", "B-52", "B-Witched", "B.B. King", "B4", "BC Big Bud", "BC Roadkill", "BC Sweet Tooth", "BOG Bubble", "BSC", "Bakerstreet", "Balmoral", "Banana Candy", "Banana Diesel", "Banana Kush", "Banana OG",
              "Banana Peel"
            ],
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

function fetchData() {
  let names;
  axios.get(`http://strainapi.evanbusse.com/5QPNwCQ/strains/search/all`)
    .then((response) => {
      names = Object.keys(response.data)
      // console.log('name', names)
    })
    return names;
}
