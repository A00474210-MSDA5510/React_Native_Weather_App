import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Button,TouchableOpacity } from "react-native";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('locations.db');

export default function SavedLocations({navigation}) {
  const [savedLocations, setSavedLocations] = useState([]);

  useEffect(() => {
    fetchSavedLocations();
  }, []);

  const fetchSavedLocations = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM locations',
        [],
        (_, { rows }) => {
          setSavedLocations(rows._array);
        },
        (_, error) => {
          console.error('Error fetching saved locations:', error);
        }
      );
    });
  };

  const deleteLocation = (id) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM locations WHERE id = ?',
        [id],
        () => {
          console.log('Location deleted successfully');
          fetchSavedLocations(); // Refresh the list of saved locations after deletion
        },
        (_, error) => {
          console.error('Error deleting location:', error);
        }
      );
    });
  };

  const handleLocationPress = (item) => {
    // Navigate to a different page and pass latitude and longitude as params
    navigation.navigate('DisplayCityWeather', {
      latitude: item.latitude,
      longitude: item.longitude
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Locations</Text>
      {savedLocations.length === 0 ? (
        <Text>No saved locations found.</Text>
      ) : (
        <FlatList
          data={savedLocations}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleLocationPress(item)}>
            <View style={styles.item}>
              <Text>{item.locationName}</Text>
              <Text>Latitude: {item.latitude}</Text>
              <Text>Longitude: {item.longitude}</Text>
              <Button title="Delete" onPress={() => deleteLocation(item.id)} />
            </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  item: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
});
