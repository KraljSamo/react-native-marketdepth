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
    if (!showLive) {
      return;
    }
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
        <Text style={{ fontSize: 30 }}>Order book chart</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ flex: 2, fontSize: 20 }}>Time:</Text>
          <Text style={{ flex: 3, fontSize: 20 }}>
            {selectedSnapshot ? getPrettyTime(selectedSnapshot.timestamp) : "Fetching data ... "}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ flex: 2, fontSize: 20 }}>{currentTicker}</Text>
          <Text style={{ flex: 3, fontSize: 20 }}>{selectedSnapshot?.price}</Text>
        </View>
        <View style={{ flexDirection: "row", height: 30 }}>
          <View style={[{ backgroundColor: "#ffcec4" }, styles.bottomButtonContainer]}>
            <TouchableHighlight onPress={() => previousSnapshot()} style={styles.bottomButton}>
              <Text> Prev </Text>
            </TouchableHighlight>
          </View>
          <View style={[{ backgroundColor: showLive ? "#f7d699" : "#b2f57f", flex: 1 }, styles.bottomButtonContainer]}>
            <TouchableHighlight onPress={() => toggleLive()} style={styles.bottomButton}>
              <Text> {showLive ? "Pause" : "Go live"} </Text>
            </TouchableHighlight>
          </View>
          <View style={[{ backgroundColor: "#8dadf2", flex: 1 }, styles.bottomButtonContainer]}>
            <TouchableHighlight onPress={() => nextSnapshot()} style={styles.bottomButton}>
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
  bottomButtonContainer: {
    flex: 1,
    borderRadius: 5,
  },
  bottomButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LiveFeedScreen;
