import { combineReducers } from "redux";

const initialState = {
  selectedTicker: "BTCEUR",
  priceData: [
    {
      ticker: "BTCEUR",
      price: 0,
      history: [],
    },
    {
      ticker: "BTCUSD",
      price: 0,
      history: [],
    },
  ],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_PAIR":
      return { ...state, selectedTicker: action.payload };
    case "ADD_SNAPSHOT":
      let newState = { ...state };

      let data = state.priceData;
      let changingObject = data.filter((item) => item.ticker === action.payload.ticker)[0];
      let updatedObject = {
        ticker: changingObject.ticker,
        price: action.payload.price,
        history: [...changingObject.history],
      };
      updatedObject.history.push({
        timestamp: action.payload.timestamp,
        price: action.payload.price,
      });
      newState.priceData = data.filter((item) => item.ticker !== action.payload.ticker);
      newState.priceData.push(updatedObject);
      return newState;
    default:
      return state;
  }
};

export default combineReducers({ data: appReducer });
