import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const API_URL = 'https://api.navitia.io/v1';
const API_KEY = '7680f887-a54c-4a3f-a510-9ca9b816ce80';

const MyComponent = () => {
  const [searchResults, setSearchResults] = useState([]);

  const findJourneys = async () => {
    try {
      const response = await fetch(
        `${API_URL}/coverage/fr-idf/journeys?from=2.3749036%3B48.8467927&to=2.2922926%3B48.8583736&`,
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );
      const data = await response.json();
      setSearchResults(data.journeys || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    findJourneys();
  }, []);

  const renderJourneyItem = ({ item }) => {
    const { sections } = item;
  
    return (
      <View style={styles.journeyItem}>
        <Text>Itinéraire</Text>
        {sections.map((section, index) => {
          if (section.type === 'waiting') {
            return null; // Ne rend pas la section si le type est "waiting"
          }
  
          return (
            <View key={index}>
              <Text>Étape {index + 1}</Text>
              <Text>
                {section.mode}{section.transfer_type}{section.display_informations?.commercial_mode}{section.display_informations?.code} {'>'} {section.display_informations?.direction} {section.from && <Text>from: {section.from.name}</Text>} {section.to && <Text>To: {section.to.name}</Text>} during {Math.floor(section.duration / 60)} minutes
              </Text>
              {/* Ajoutez d'autres informations spécifiques à chaque section ici */}
            </View>
          );
        })}
      </View>
    );
  };
  
  

  return (
    <View style={styles.container}>
      <Text>Trouver un itinéraire</Text>

      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderJourneyItem}
        />
      ) : (
        <Text>Aucun itinéraire trouvé</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    margin: 20,
  },
  journeyItem: {
    borderBottomWidth: 1,
    borderColor: 'grey',
    paddingBottom: 10,
    marginBottom: 10,
  },
});

export default MyComponent;