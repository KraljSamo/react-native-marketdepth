import { combineReducers } from "redux";

const INITIAL_STATE = {
  selectedPair: "BTCEUR",
};

const pairReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CHANGE_PAIR":
      return { selectedPair: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  pair: pairReducer,
});
