export function addLog (log) {
  console.log('add log');
  return {
    type: 'ADD_LOG',
    payload: log,
  }
}

export function addWish(wish) {
  console.log('add to wishlist');
  return {
    type: 'ADD_WISHLIST',
    payload: wish,
  }
}
