const defaultState = {
  Variables: [],
  usecase: [],
  test:'测试一下'
};

const Sturnus = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "initVariables":
      return {
        ...state,
        Variables: payload
      };
    case "getusecase":
      return {
        ...state,
        usecase: payload
      };
    case 'test':
      return {
        ...state,
        test:payload
      }
    default:
      return state;
  }
};

export default Sturnus;
