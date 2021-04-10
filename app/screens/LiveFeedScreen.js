import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function LiveFeedScreen({ navigation }) {
  const dispatch = useDispatch();
  const currentTicker = useSelector((state) => state.data.selectedTicker);
  const showLive = useSelector((state) => state.data.showLive);
  const [requestCounter, setRequestCounter] = useState(0);
  const dataFeed = useSelector((state) => state.data.priceData.filter((item) => item.ticker == currentTicker))[0];

  let selectedSnapshot;
  if (dataFeed.index === -1) {
    selectedSnapshot = null;
  } else {
    selectedSnapshot = dataFeed.history[dataFeed.index];
  }

  function getPrettyTime(timestamp) {
    return new Date(timestamp * 1000).toLocaleString("sl-SI");
  }

  function previousSnapshot() {
    dispatch({ type: "CHANGE_SNAPSHOT", payload: -1 });
  }

  function nextSnapshot() {
    dispatch({ type: "CHANGE_SNAPSHOT", payload: 1 });
  }

  function toggleLive() {
    dispatch({ type: "TOGGLE_LIVE", payload: !showLive });
  }

  async function getPrice() {
    try {
      const response = await axios.get(`https://www.bitstamp.net/api/v2/ticker/${currentTicker}/`);
      const actionPayload = {
        ticker: currentTicker,
        timestamp: response.data.timestamp,
        price: response.data.last,
      };
      dispatch({ type: "ADD_SNAPSHOT", payload: actionPayload });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    try {
      getPrice();
      setTimeout(() => setRequestCounter(requestCounter + 1), 5000);
    } catch (e) {
      setRequestCounter(requestCounter + 1);
    }
  }, [requestCounter, currentTicker]);

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <View style={{ alignItems: "center", fontSize: 30 }}>
        <Text style={{ fontSize: 30 }}>{currentTicker}</Text>
        {selectedSnapshot ? (
          <>
            <Text style={{ fontSize: 20 }}>{getPrettyTime(selectedSnapshot.timestamp)}</Text>
            <Text style={{ fontSize: 20 }}>{selectedSnapshot.price}</Text>
            <Text style={{ fontSize: 20 }}>{dataFeed.index}</Text>
            <Text>History size: {dataFeed.history.length}</Text>
          </>
        ) : (
          <>
            <Text>Fetching data from the exchanges ...</Text>
            <Text>History size: {dataFeed.history.length}</Text>
          </>
        )}
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, flexDirection: "row", height: 30, margin: 10 }}>
            <TouchableHighlight onPress={() => previousSnapshot()} style={{ flex: 1, alignItems: "center" }}>
              <Text> Prev </Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => toggleLive()} style={{ flex: 1, alignItems: "center" }}>
              <Text> {showLive ? "Pause" : "Go live"} </Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => nextSnapshot()} style={{ flex: 1, alignItems: "center" }}>
              <Text> Next </Text>
            </TouchableHighlight>
          </View>
        </View>
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
