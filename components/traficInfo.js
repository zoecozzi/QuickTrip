import React, { useState, useEffect } from 'react';

const API_URL = 'https://api.navitia.io/v1';
const API_KEY = '58d625cc-ab3e-48ca-8445-15df3daf7906';

const TrafficInfo = ({ lineCode }) => {
  const [statusTraffic, setStatusTraffic] = useState([]);
  const [hasDisruptions, setHasDisruptions] = useState(false);

  useEffect(() => {
    const trafficInfo = async () => {
      try {
        const response = await fetch(
          `${API_URL}/coverage/fr-idf/lines/${lineCode}/line_reports?`,
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
          prioritizedDisruptions.length > 0
            ? prioritizedDisruptions
            : disruptions.filter((disruption) =>
                disruption.severity.name.includes('perturbée')
              );

        setStatusTraffic(finalDisruptions);
        setHasDisruptions(finalDisruptions.length > 0);

      } catch (error) {
        console.error(error);
      }
    };

    trafficInfo();
  }, [lineCode]);

  return { hasDisruptions, statusTraffic };
};



export default TrafficInfo;
