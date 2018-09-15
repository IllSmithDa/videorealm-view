import { ADDUSERNAME, ADDDISPLAYNAME } from '../actions';

export default (username = '', action) => {
  switch (action.type) {
    case ADDUSERNAME:
      return action.payload;
    case ADDDISPLAYNAME:
      return action.payload;
    default:
      return username;
  }
};
