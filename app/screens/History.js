import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";
import { useSelector } from "react-redux";

function History({ navigation }) {
  const currentTicker = useSelector((state) => state.data.selectedTicker);
  const history = useSelector((state) => state.data.priceData.filter((item) => item.ticker === currentTicker))[0]
    .history;
  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />
      {history.map((item) => {
        let prettyTime = new Date(item.timestamp * 1000).toLocaleString("en-US");
        return (
          <View style={{ flexDirection: "row", flex: 1 }} key={item.timestamp}>
            <View style={{ flex: 1 }}>
              <Text>{prettyTime}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>
                {item.price} {currentTicker === "BTCEUR" ? "€" : "$"}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

export default History;
