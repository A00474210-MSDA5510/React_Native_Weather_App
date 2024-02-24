import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, View } from "react-native";

import DisplayWeather from "./screens/DisplayWeather";
import SearchPage from "./screens/SearchPage";
import SearchResults from "./screens/SearchResults"
import DisplayCityWeather from "./screens/DisplayCityWeather";
import SavedLocations from "./screens/SavedLocations";

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerTintColor: "#282120",
  headerStyle: { backgroundColor: "#FAD02C" },
  headerTitleStyle: { color: "#282120" },
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        {/* Screen for displaying weather */}
        <Stack.Screen
          name="Home"
          component={DisplayWeather}
          options={{ title: "Weather App" }}
        />
      <Stack.Screen
          name="Search"
          component={SearchPage}
          options={{ title: "Search Page" }}
        />
        {/* Define SearchResults screen */}
        <Stack.Screen
          name="SearchResults"
          component={SearchResults}
          options={{ title: "Search Results" }}
        />
        <Stack.Screen
          name="DisplayCityWeather"
          component={DisplayCityWeather}
          options={{ title: "City Weather" }}
        />
         <Stack.Screen
          name="SavedLocations"
          component={SavedLocations}
          options={{ title: "Saved Locations" }}
        />

      </Stack.Navigator>
      <SwitchButtons />
    </NavigationContainer>
  );
}

function SwitchButtons() {
  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around", paddingVertical: 10 }}>
      <Button
        title="Home"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title="Search"
        onPress={() => navigation.navigate('Search')}
      />
      <Button
        title="Saved"
        onPress={() => navigation.navigate('SavedLocations')}
      />
    </View>
  );
}