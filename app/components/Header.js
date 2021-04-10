import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-community/picker";

function Header(props) {
  const [pair, setPair] = useState("BTCEUR");

  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        title={"To live feed"}
        onPress={() => props.navigation.navigate("LiveFeed")}
        color={"green"}
      />
      <Button style={styles.button} title={"See history"} onPress={() => props.navigation.navigate("History")} />
      <Picker style={{ flex: 1 }} selectedValue={pair} onValueChange={(itemValue) => setPair(itemValue)}>
        <Picker.Item label="BTC/EUR" value="BTCEUR" />
        <Picker.Item label="BTC/USD" value="BTCUSD" />
      </Picker>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  button: {},
});
