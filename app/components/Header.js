import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-community/picker";
import { useDispatch, useSelector } from "react-redux";

function Header(props) {
  const currentTicker = useSelector((state) => state.selectedTicker);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Button title={"To live feed"} onPress={() => props.navigation.navigate("LiveFeed")} color={"#7ee30b"} />
      <Button title={"See history"} onPress={() => props.navigation.navigate("History")} color={"#6d96ed"} />
      <Picker
        style={{ flex: 1 }}
        selectedValue={currentTicker}
        onValueChange={(itemValue) => dispatch({ type: "CHANGE_PAIR", payload: itemValue })}
      >
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
    alignItems: "center",
  },
});
