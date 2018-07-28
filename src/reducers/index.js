import { combineReducers } from 'redux';
import VideoReducer from './VideoReducer';

const rootReducer = combineReducers({
  videoList: VideoReducer
});

export default rootReducer;