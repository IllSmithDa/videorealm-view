import {
  GET_ALL_VIDEOS
} from '../actions';

export default (state = [], action) => {
  switch(action.type) {
    case GET_ALL_VIDEOS:
      return action.videoData;
    default:
      return state;
  }
}