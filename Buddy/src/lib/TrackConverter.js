
export const product_props = {
  1: 'Flower',
  2: 'Pre-roll',
  3: 'Extract',
  4: 'Vape',
  5: 'Edible',
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

export const duration_props = [
  {label: '< 1 hr', value: 0 },
  {label: '1-2 hr', value: 1 },
  {label: '3+ hr', value: 2 },
];
