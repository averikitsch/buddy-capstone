
export const product_props = {
  1: 'Flower',
  2: 'Pre-roll',
  3: 'Extract',
  4: 'Vape',
  5: 'Edible',
};

export const product2num = {
  'Flower':1,
  'Pre-roll':2,
  'Extract':3,
  'Vape':4,
  'Edible':5,
};

export const product_map = Object.entries(product_props).map((product) => {
  return {label: product[1], value: product[0]};
})

export const unit = {
  1: "bowl",
  3: "dab",
  2: "g joint",
  4: "pull",
  5: "mg",
}

export const units = {
  1: "bowls",
  3: "dabs",
  2: "g joint",
  4: "pulls",
  5: "mg",
}

export const quantityValues = {
  1: {step: 1, max: 10},
  2: {step: 0.25, max: 1},
  3: {step: 1, max: 10},
  4: {step: 1, max: 10},
  5: {step: 2.5, max: 20},
}

export const duration_props = {
  0: '< 1 hr',
  1: '1-2 hr',
  2: '3+ hr',
}

const activity_props = {
  0: 'bed',
  1: 'couch',
  2: 'neutral',
  3: 'up',
  4: 'party',
}

export const duration_map = Object.entries(duration_props).map((product) => {
  return {label: product[1], value: product[0]};
})

const quantityMap = (state) => {
  return `${quantityValues[state.product].step * state.quantity} ${(state.quantity == 1) ? unit[state.product] : units[state.product]}`
}

const addFlavor = (obj) => {
  return Object.keys(obj).filter((flavor) => {
    return obj[flavor]
  })
}

export const date = () => {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1; //January is 0!

  const yyyy = today.getFullYear();
  if(dd<10){
    dd='0'+dd;
  }
  if(mm<10){
    mm='0'+mm;
  }
  return dd+'/'+mm+'/'+yyyy;
}

export const convert = (state) => {
  return {
    name: state.name,
    brand: state.brand,
    product: product_props[state.product],
    type: state.type,
    duration: duration_props[state.duration],
    activity: activity_props[state.activity],
    ranking: state.ranking + 1,
    flavors: state.flavors ? addFlavor(state.flavors) : null,
    date: state.date,
    quantity: quantityMap(state),
  }
}

// export const quantityConvert = (state) => {
//
// }
