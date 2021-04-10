import React from "react";
import { View, Text } from "react-native";
import Header from "../components/Header";

function History({ navigation }) {
  return (
    <View>
      <Header navigation={navigation} />
      <Text>Historical prices </Text>
    </View>
  );
}

export default History;
