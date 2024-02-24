import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";


export default function SearchResults({ route,navigation }) {
  const { searchWord } = route.params;
  const [parsedData, setParsedData] = useState([]);

  useEffect(() => {
    // Fetch search results based on the search word
    const fetchSearchResults = async () => {
      try {
        // Perform your search API call here using the searchWord
        // For example:
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${searchWord}&count=10&language=en&format=json`);
        const data = await response.json();
        if (data.results) {
          const parsedItems = data.results.map(item => ({
            name: item.name,
            country: item.country,
            latitude: item.latitude,
            longitude: item.longitude
          }));

          setParsedData(parsedItems);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
    

    fetchSearchResults();
  }, [searchWord]);

  const handleItemClick = (item) => {
    // Navigate to a different page and pass latitude and longitude as params
    navigation.navigate('DisplayCityWeather', {
      latitude: item.latitude,
      longitude: item.longitude
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Search results for: {searchWord}</Text>
      {parsedData.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.itemContainer}
          onPress={() => handleItemClick(item)}
        >
          <Text style={styles.itemText}>Name: {item.name}</Text>
          <Text style={styles.itemText}>Country: {item.country}</Text>
          <Text style={styles.itemText}>Latitude: {item.latitude}</Text>
          <Text style={styles.itemText}>Longitude: {item.longitude}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
});