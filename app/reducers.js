import { combineReducers } from "redux";

const initialState = {
  selectedTicker: "BTCEUR",
  showLive: true,
  priceData: [
    {
      ticker: "BTCEUR",
      index: -1,
      history: [],
    },
    {
      ticker: "BTCUSD",
      index: -1,
      history: [],
    },
  ],
};

const appReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "CHANGE_PAIR":
      return { ...state, selectedTicker: action.payload, showLive: true };
    case "TOGGLE_LIVE":
      return { ...state, showLive: action.payload };
    case "ADD_SNAPSHOT":
      let data = state.priceData;
      let changingObject = data.filter((item) => item.ticker === action.payload.ticker)[0];
      let updatedObject = {
        ticker: changingObject.ticker,
        index: changingObject.index,
        history: [...changingObject.history],
      };
      updatedObject.history.push({
        timestamp: action.payload.timestamp,
        price: action.payload.price,
        asks: action.payload.asks,
        bids: action.payload.bids,
      });

      // Limit history size to max 50 records
      const currentSize = updatedObject.history.length;
      if (currentSize > 50) updatedObject.history = updatedObject.history.slice(currentSize - 50, currentSize);

      if (state.showLive) {
        updatedObject.index = updatedObject.history.length - 1;
      }

      newState.priceData = data.filter((item) => item.ticker !== action.payload.ticker);
      newState.priceData.push(updatedObject);
      return newState;
    case "CHANGE_SNAPSHOT":
      newState.priceData
        .filter((item) => item.ticker === state.selectedTicker)
        .map((item) => {
          if (action.payload == 1 && item.index < item.history.length - 1) {
            item.index += 1;
          } else if (action.payload == -1 && item.index > 0) {
            item.index -= 1;
          }
          return item;
        });
      newState.showLive = false;
      return newState;
    default:
      return state;
  }
};

export default combineReducers({ data: appReducer });
