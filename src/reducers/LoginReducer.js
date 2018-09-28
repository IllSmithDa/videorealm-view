import { CHECKLOGINSTATE } from '../actions';

export default (state = true, action) => {
  switch (action.type) {
    case CHECKLOGINSTATE:
      // console.log('payload: ', action.payload);
      return action.payload;
    default:
      return state;
  }
};
