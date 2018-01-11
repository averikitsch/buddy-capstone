import { createStore } from 'redux';
import reducer from './Reducers/';
import { addLog } from './Actions/index'

const store = createStore(reducer);

store.subscribe(() => {
  console.log("store changed", store.getState())
})

// store.dispatch(addLog({name: 'fake', brand:'fakey', product: 'hi'}))


export default store;
