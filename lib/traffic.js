// /* Récupération des ID et des noms de toutes les lignes de métro */

// const metroArray = [];
// const rerArray = [];
// const transArray = [];
// const tramArray = [];
// const t4Array = [];

// let combinedArray = [];



// const fetchMetroData = async () => {
//     try {
//       const metroData = await fetch('https://api.navitia.io/v1/coverage/fr-idf/networks/network%3AIDFM%3AOperator_100/physical_modes/physical_mode%3AMetro/lines?', {
//         headers: {
//           Authorization: '58d625cc-ab3e-48ca-8445-15df3daf7906',
//         },
//       });
//       const metroJson = await metroData.json();
  
//       if (metroJson.hasOwnProperty('lines')) {
  
//         metroJson.lines.forEach(line => {
//           const metroId = line.id;
//           const metroCode = line.code;
//           metroArray.push({ id: metroId, code: metroCode });
//         });
  
//         // Stockage des données dans AsyncStorage
//         await AsyncStorage.setItem('metros', JSON.stringify(metroArray));
//         console.log('Données de métro stockées avec succès dans AsyncStorage.');
//         console.log('------------------');
//       } else {
//         console.log('Aucune donnée de métro disponible.');
//       }
//     } catch (error) {
//       console.error('Une erreur s\'est produite lors de la récupération des données de métro:', error);
//     }
//   };

//   /* Récupération des ID et des noms de toutes les lignes de RER */

  
//   const fetchRERData = async () => {
//     try {
//       const RERData = await fetch('https://api.navitia.io/v1/coverage/fr-idf/networks/network%3AIDFM%3A71/physical_modes/physical_mode%3ARapidTransit/lines?', {
//         headers: {
//           Authorization: '58d625cc-ab3e-48ca-8445-15df3daf7906',
//         },
//       });
//       const RERJson = await RERData.json();
  
//       if (RERJson.hasOwnProperty('lines')) {
  
//         RERJson.lines.forEach(line => {
//           const rerId = line.id;
//           const rerCode = line.code;
//           rerArray.push({ id: rerId, code: rerCode });
//         });
  
//         // Stockage des données dans AsyncStorage
//         await AsyncStorage.setItem('rers', JSON.stringify(rerArray));
//         console.log('Données de rer stockées avec succès dans AsyncStorage.');
//         console.log('------------------');
//       } else {
//         console.log('Aucune donnée de rer disponible.');
//       }
//     } catch (error) {
//       console.error('Une erreur s\'est produite lors de la récupération des données de rer:', error);
//     }
//   };

//   /* Récupération des ID et des noms de toutes les lignes de Transilien */

  
//   const fetchTransData = async () => {
//     try {
//       const TransData = await fetch('https://api.navitia.io/v1/coverage/fr-idf/networks/network%3AIDFM%3A1046/physical_modes/physical_mode%3ALocalTrain/lines?', {
//         headers: {
//           Authorization: '58d625cc-ab3e-48ca-8445-15df3daf7906',
//         },
//       });
//       const TransJson = await TransData.json();
  
//       if (TransJson.hasOwnProperty('lines')) {
  
//         TransJson.lines.forEach(line => {
//           const transId = line.id;
//           const transCode = line.code;
//           transArray.push({ id: transId, code: transCode });
//         });
  
//         // Stockage des données dans AsyncStorage
//         await AsyncStorage.setItem('trans', JSON.stringify(transArray));
//         console.log('Données de transilien stockées avec succès dans AsyncStorage.');
//         console.log('------------------');
//       } else {
//         console.log('Aucune donnée de trains locaux disponible.');
//       }
//     } catch (error) {
//       console.error('Une erreur s\'est produite lors de la récupération des données de transiliens:', error);
//     }
//   };

//   /* Récupération des ID et des noms de toutes les lignes de Tramway sans T4 */

  
//   const fetchTramData = async () => {
//     try {
//       const tramData = await fetch('https://api.navitia.io/v1/coverage/fr-idf/networks/network%3AIDFM%3AOperator_100/physical_modes/physical_mode%3ATramway/lines?', {
//         headers: {
//           Authorization: '58d625cc-ab3e-48ca-8445-15df3daf7906',
//         },
//       });
//       const tramJson = await tramData.json();
  
//       if (tramJson.hasOwnProperty('lines')) {
  
//         tramJson.lines.forEach(line => {
//           const tramId = line.id;
//           const tramCode = line.code;
//           tramArray.push({ id: tramId, code: tramCode });
//         });
  
//         // Stockage des données dans AsyncStorage
//         await AsyncStorage.setItem('trams', JSON.stringify(tramArray));
//         console.log('Données de tramway stockées avec succès dans AsyncStorage.');
//         console.log('------------------');
//       } else {
//         console.log('Aucune donnée de tramway disponible.');
//       }
//     } catch (error) {
//       console.error('Une erreur s\'est produite lors de la récupération des données de tramway:', error);
//     }
//   };

//   /* Récupération des ID et des noms de toutes les lignes de T4 */

  
//   const fetcht4Data = async () => {
//     try {
//       const t4Data = await fetch('https://api.navitia.io/v1/coverage/fr-idf/networks/network%3AIDFM%3A1046/physical_modes/physical_mode%3ATramway/lines?', {
//         headers: {
//           Authorization: '58d625cc-ab3e-48ca-8445-15df3daf7906',
//         },
//       });
//       const t4Json = await t4Data.json();
  
//       if (t4Json.hasOwnProperty('lines')) {

//         for (const line of t4Json.lines) {
//           const t4Id = line.id;
//           const t4Code = line.code;
//           t4Array.push({ id: t4Id, code: t4Code });
//           break; // Sortir de la boucle après la première itération
//         }
  
//         // Stockage des données dans AsyncStorage
//         await AsyncStorage.setItem('t4', JSON.stringify(t4Array));
//         console.log('Données de t4 stockées avec succès dans AsyncStorage.');
//         console.log('------------------');
//       } else {
//         console.log('Aucune donnée de t4 disponible.');
//       }
//     } catch (error) {
//       console.error('Une erreur s\'est produite lors de la récupération des données de t4:', error);
//     }
//   };
  


//   export const fetchAllData = async () => {
//     try {
//       await Promise.all([fetchMetroData(), fetcht4Data(), fetchTramData(), fetchTransData(), fetchRERData()]);
//       combinedArray = metroArray.concat(tramArray, transArray, rerArray, t4Array);
//     } catch (error) {
//       console.error('Une erreur s\'est produite lors de la récupération des données :', error);
//     }
//   };
  
//   export const getCombinedArray = () => combinedArray;

//   export const getIdFromCode = (code) => {
//     const line = combinedArray.find((line) => line.code === code);
//     return line ? line.id : null;
//   }

  