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

export function rmLog (log) {
  console.log('remove log');
  return {
    type: 'DELETE_LOG',
    payload: log,
  }
}

export function updateLog (log) {
  console.log('update log');
  return {
    type: 'UPDATE_LOG',
    payload: log,
  }
}
