import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';

const API_URL = 'https://api.navitia.io/v1';
const API_KEY = '58d625cc-ab3e-48ca-8445-15df3daf7906';

const TrafficReport = ({lineCode}) => {
  const [statusTraffic, setStatusTraffic] = useState([]);
  const [reportMessage, setReportMessage] = useState([]);

  const trafficInfo = async () => {
    try {
      const response = await fetch(
        `${API_URL}/coverage/fr-idf/lines/line%3AIDFM%3AC01384/line_reports?`,
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );

      const data = await response.json();

      const disruptions = data.disruptions.filter(
        (disruption) =>
          disruption.status === 'active' &&
          disruption.cause === 'perturbation' &&
          disruption.tags.includes('Actualité')
      );

      const prioritizedDisruptions = disruptions.filter(
        (disruption) => disruption.severity.name.includes('bloquante')
      );

      const finalDisruptions =
        prioritizedDisruptions.length > 0 ? prioritizedDisruptions : disruptions.filter(
          (disruption) => disruption.severity.name.includes('perturbée')
        );


      setStatusTraffic(finalDisruptions);

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
            <Text>Severity: {item.severity.name}</Text>
            <Text>Message: {item.messages.map((message) => message.text)}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default TrafficReport;
