import { combineReducers } from 'redux';

import logs from './LogsReducer';
import wishlist from './WishlistReducer';
import user from './UserReducer';

export default combineReducers({
  user,
  logs,
  wishlist,
})
