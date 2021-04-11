import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableHighlight } from "react-native";
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";

function getPrettyTime(timestamp) {
  return new Date(timestamp * 1000).toLocaleString("sl-SI");
}

function HistoryRow({ item, handleRowPress }) {
  return (
    <View style={{ flexDirection: "row", height: 30, alignItems: "center" }}>
      <View style={{ flex: 3, borderBottomColor: "black", borderBottomWidth: 1 }}>
        <Text>{getPrettyTime(item.timestamp)}</Text>
      </View>
      <View style={{ flex: 2, borderBottomColor: "black", borderBottomWidth: 1 }}>
        <Text>{item.price}</Text>
      </View>
      <TouchableHighlight
        style={{ flex: 1, backgroundColor: "#a0f55f", borderRadius: 10, alignItems: "center" }}
        onPress={handleRowPress}
        underlayColor={"#a0f55f"}
      >
        <Text> Chart </Text>
      </TouchableHighlight>
    </View>
  );
}

function History({ navigation }) {
  const currentTicker = useSelector((state) => state.data.selectedTicker);
  const dataFeed = useSelector((state) => state.data.priceData.filter((item) => item.ticker === currentTicker))[0];
  const dispatch = useDispatch();

  function handleRowPress(index) {
    dispatch({ type: "CHANGE_SNAPSHOT", payload: index });
    navigation.navigate("LiveFeed");
  }

  return (
    <View style={{ flex: 1, margin: 10 }}>
      <Header navigation={navigation} />
      <View>
        <FlatList
          data={dataFeed.history.map((item, index) => ({ ...item, key: index.toString(), index: index }))}
          renderItem={({ item }) => (
            <HistoryRow key={item.key} item={item} handleRowPress={() => handleRowPress(item.index)} />
          )}
        />
      </View>
    </View>
  );
}

export default History;
