import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";

export default function SearchPage({ navigation }) {
  const [searchWord, setSearchWord] = useState("");

  const handleSearch = () => {
    // Navigate to SearchResults screen and pass the searched word as parameter
    navigation.navigate('SearchResults', { searchWord });
  };

  return (
    <View>
      <TextInput
        placeholder="Enter search word"
        value={searchWord}
        onChangeText={setSearchWord}
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
}