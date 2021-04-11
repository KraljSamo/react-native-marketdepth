import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableHighlight } from "react-native";
import Header from "../components/Header";
import { useSelector } from "react-redux";

function getPrettyTime(timestamp) {
  return new Date(timestamp * 1000).toLocaleString("sl-SI");
}

function HistoryRow({ item }) {
  return (
    <View style={{ flexDirection: "row", height: 30, alignItems: "center" }}>
      <View style={{ flex: 3 }}>
        <Text>{getPrettyTime(item.timestamp)}</Text>
      </View>
      <View style={{ flex: 2 }}>
        <Text>{item.price}</Text>
      </View>
      <TouchableHighlight style={{ flex: 1 }} onPress={() => console.log(item.timestamp)}>
        <Text>OB </Text>
      </TouchableHighlight>
    </View>
  );
}

function History({ navigation }) {
  const currentTicker = useSelector((state) => state.data.selectedTicker);
  const dataFeed = useSelector((state) => state.data.priceData.filter((item) => item.ticker === currentTicker))[0];

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <View>
        <FlatList
          data={dataFeed.history.map((item, index) => ({ ...item, key: index.toString() }))}
          renderItem={({ item }) => <HistoryRow key={item.key} item={item} />}
        />
      </View>
    </View>
  );
}

export default History;
