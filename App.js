import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import React from "react";
import LiveFeedScreen from "./app/screens/LiveFeedScreen";
import History from "./app/screens/History";

import { Provider } from "react-redux";
import { createStore } from "redux";
import Reducer from "./app/reducers";

const Stack = createStackNavigator();

const store = createStore(Reducer);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LiveFeed" component={LiveFeedScreen} />
          <Stack.Screen name="History" component={History} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
