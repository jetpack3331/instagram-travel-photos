import { combineReducers } from 'redux';
import auth from './auth';
import pictures from './pictures';

export default combineReducers({
  auth,
  pictures,
});
