import { createStore,  applyMiddleware, compose } from 'redux';
import reducer from './Reducers/';
import thunk from 'redux-thunk';
import { autoRehydrate } from 'redux-persist';

const middleware = applyMiddleware(thunk)

const store = createStore(
  reducer,
  {},
  compose(middleware, autoRehydrate())
);

store.subscribe(() => {
  console.log("store changed", store.getState())
})

// store.dispatch(addLog({name: 'fake', brand:'fakey', product: 'hi'}))


export default store;
