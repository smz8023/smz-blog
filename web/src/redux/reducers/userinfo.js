const defaultState = {
  userinfo:{}
};

const UserInfo = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "setUserInfo":
      return {
        ...state,
        userinfo:payload
      };

    default:
      return state;
  }
};

export default UserInfo;
