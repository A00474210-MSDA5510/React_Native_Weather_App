import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as SQLite from 'expo-sqlite';
import Weather from "../components/Weather";
import { API_KEY } from "../utils/WeatherAPIKey";

const db = SQLite.openDatabase('locations.db');

function DisplayCityWeather({ route }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { latitude, longitude } = route.params;

  const [weatherData, setWeatherData] = useState({
    temperature: 0,
    locationName: "",
    weatherCondition: "",
    conditionIcon: "",
  });

  const [savedLocationsCount, setSavedLocationsCount] = useState(0); // State to track the number of saved locations

  useEffect(() => {
    setIsLoading(true);
    fetchWeather(latitude, longitude);

    // Create table if it doesn't exist
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY AUTOINCREMENT, latitude REAL, longitude REAL, locationName TEXT);'
      );
    });

    // Fetch the number of saved locations from the database
    db.transaction(tx => {
      tx.executeSql(
        'SELECT COUNT(*) as count FROM locations',
        [],
        (_, { rows }) => {
          setSavedLocationsCount(rows._array[0].count);
        },
        (_, error) => {
          console.error('Error fetching saved locations count:', error);
        }
      );
    });
  }, []);

  const fetchWeather = (latitude = 25, longitude = 25) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((json) => {
        setWeatherData({
          temperature: json.main.temp,
          locationName: json.name,
          weatherCondition: json.weather[0].main,
          conditionIcon: json.weather[0].icon,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  const saveLocationToDatabase = () => {
    if (savedLocationsCount >= 4) {
      alert('You can only save up to 4 locations.');
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO locations (latitude, longitude, locationName) VALUES (?, ?, ?)',
        [latitude, longitude, weatherData.locationName],
        (_, results) => {
          console.log('Location saved to database:', results.insertId);
          setSavedLocationsCount(savedLocationsCount + 1); // Increment the count of saved locations
        },
        (_, error) => {
          console.error('Error saving location to database:', error);
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text style={styles.loadingText}>Fetching the weather data...</Text>
      ) : (
        <>
          <Weather weatherData={weatherData} />
          <Button title="Save Location" onPress={saveLocationToDatabase} />
        </>
      )}
      {error && <Text style={{ color: "red" }}>An error has occurred!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
  },
  loadingText: {
    color: "black",
  },
});

export default DisplayCityWeather;