import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';

const API_URL = 'https://api.navitia.io/v1';
const API_KEY = '58d625cc-ab3e-48ca-8445-15df3daf7906';

const TrafficReport = () => {
  const [statusTraffic, setStatusTraffic] = useState([]);
  const [reportMessage, setReportMessage] = useState([]);

  const trafficInfo = async () => {
    try {
      const response = await fetch(
        `${API_URL}/coverage/fr-idf/networks/network%3AIDFM%3A1046/lines/line%3AIDFM%3AC01730/line_reports?`,
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );

      const data = await response.json();

      const filteredDisruptions = data.disruptions.filter(
        (disruption) =>
          disruption.status === 'active' &&
          disruption.cause === 'perturbation' &&
          disruption.tags.includes('Actualité') &&
          disruption.severity.name.includes('perturbée') 
      );


      setStatusTraffic(filteredDisruptions);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    trafficInfo();
  }, []);


  return (
    <View style = {{flex:1}}>
      <Text>TRAFFIC</Text>
      <FlatList
        data={statusTraffic}
        renderItem={({ item }) => (
          <View>
            <Text>Status: {item.status}</Text>
            <Text>Cause: {item.cause}</Text>
            <Text>Message: {item.messages.map((message) => message.text)}</Text>
            {/* <HTMLRender html={item.messages.map((message) => HTMLDecode(message)).join('')} /> */}
            {/* Ajoutez ici d'autres informations à afficher */}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default TrafficReport;
