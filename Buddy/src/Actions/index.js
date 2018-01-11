export const addLog = (log) => {
  console.log('add log');
  return {
    type: 'ADD_LOG',
    payload: log,
  }
}
