import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";
import { useSelector } from "react-redux";

function LiveFeedScreen({ navigation }) {
  const currentPair = useSelector((state) => state.pair.selectedPair);
  console.log(currentPair);
  return (
    <View>
      <Header navigation={navigation} />
      <View>
        <Text>{currentPair}</Text>
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
