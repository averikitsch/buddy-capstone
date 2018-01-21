import { createStore,  applyMiddleware, compose } from 'redux';
import reducers from './Reducers/';
import thunk from 'redux-thunk';
import { REHYDRATE, PURGE, persistCombineReducers, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
//
import logs from './Reducers/LogsReducer';
import wishlist from './Reducers/WishlistReducer';
import user from './Reducers/UserReducer';
import search from './Reducers/SearchReducer';

// export default combineReducers()
const middleware = applyMiddleware(thunk)

const config = {
  key: 'primary',
  storage
}

const store = createStore(
  persistCombineReducers(config, {
    user,
    logs,
    wishlist,
    search,
  }),
  undefined,
  compose(middleware)
);

store.subscribe(() => {
  console.log("store changed", store.getState())
})

const persistor = persistStore(
  store,
  null,
  () => {store.getState()}
);

export default () => {
  return {store, persistor}
}
