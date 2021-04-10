import React from "react";
import { View, Text, Button } from "react-native";

function Header(props) {
  return (
    <View>
      <Button title={"To live feed"} onPress={() => props.navigation.navigate("LiveFeed")} />
      <Button title={"See history"} onPress={() => props.navigation.navigate("History")} />
    </View>
  );
}

export default Header;
