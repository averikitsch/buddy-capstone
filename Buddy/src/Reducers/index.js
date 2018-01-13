import { combineReducers } from 'redux';

import logs from './LogsReducer';
import wishlist from './WishlistReducer';
import user from './UserReducer';
import search from './SearchReducer';

export default combineReducers({
  user,
  logs,
  wishlist,
  search,
})
