import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";

function LiveFeedScreen({ navigation }) {
  return (
    <View>
      <Header navigation={navigation} />
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
