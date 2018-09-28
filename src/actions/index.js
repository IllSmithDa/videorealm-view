export const LOGINUSER = 'LOGINUSER';
export const ADDUSERNAME = 'ADDUSERNAME';
export const ADDDISPLAYNAME = 'ADDDISPLAYNAME';
export const CHECKLOGINSTATE = 'CHECKLOGINSTATE';

export const loginUser = (user) => {
  // console.log(user);
  return {
    type: LOGINUSER,
    payload: user,
  };
};

export const addUsername = (username) => {
  // console.log(username);
  return {
    type: ADDUSERNAME,
    payload: username,
  };
};

export const addDisplayname = (displayname) => {
  // console.log(displayname);
  return {
    type: ADDUSERNAME,
    payload: displayname,
  };
};

export const checkLoginState = (loginState) => {
  return {
    type: CHECKLOGINSTATE,
    payload: loginState,
  };
};
