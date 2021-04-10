import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function LiveFeedScreen({ navigation }) {
  const currentTicker = useSelector((state) => {
    console.log(state);
    return state.data.selectedTicker;
  });

  const dispatch = useDispatch();
  const [timestamp, setTimestamp] = useState(0);
  const [price, setPrice] = useState("");
  const [requestCounter, setRequestCounter] = useState(0);

  async function getPrice() {
    const response = await axios.get(`https://www.bitstamp.net/api/v2/ticker/${currentTicker}/`);
    console.log(response.data);
    setTimestamp(response.data.timestamp);
    setPrice(response.data.last);

    const actionPayload = {
      ticker: currentTicker,
      timestamp: response.data.timestamp,
      price: response.data.last,
    };
    dispatch({ type: "ADD_SNAPSHOT", payload: actionPayload });
  }

  useEffect(() => {
    setTimeout(async () => {
      await getPrice();
      setRequestCounter(requestCounter + 1);
    }, 5000);
  }, [requestCounter, currentTicker]);

  return (
    <View>
      <Header navigation={navigation} />
      <View>
        <Text>{currentTicker}</Text>
        <Text>
          {timestamp}: {price}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});

export default LiveFeedScreen;
