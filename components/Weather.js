import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Weather = ({ weatherData }) => {
  return (
    <View style={styles.weatherContainer}>
      <View style={styles.headerContainer}>
        <Image
          source={{
            uri: `http://openweathermap.org/img/wn/${weatherData.conditionIcon}@2x.png`,
          }}
          style={{ width: 120, height: 120 }}
        />
        <Text style={styles.tempText}>{weatherData.locationName}</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>{weatherData.temperature}˚</Text>
        <Text style={styles.subtitle}>{weatherData.weatherCondition}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    marginTop: 90,
    marginBottom: 55,
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  tempText: {
    fontSize: 48,
    color: "black",
    marginTop: 5,
  },
  bodyContainer: {
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingLeft: 25,
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
    color: "black",
  },
  subtitle: {
    fontSize: 24,
    color: "black",
  },
});

export default Weather;
