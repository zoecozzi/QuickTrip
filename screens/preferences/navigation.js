import React, { useState } from 'react';
import QuickButton from '../../components/button';

import { View } from 'react-native';
import Main from './main';
import SearchAddress from './search';
import Setting from './settings';
import { SafeAreaView } from 'react-navigation';
import styles from '@styles/preferences.scss'



const PreferencesScreen = ({ close }) => {

    const [section, setSection] = useState(1);

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[styles.preferencesScreen, { flex: 1 }]}>
          <View style={styles.closeButtonContainer}>
            <QuickButton image={require('../../assets/cross.png')} functionToCall={close}  style={styles.closePreferencesButton}/> 
          </View>
          {section === 1 && <Main close={close} section={setSection} />}
          {section === 2 && <SearchAddress close={close} section={setSection} />}
          {section === 3 && <Setting close={close} section={setSection} />}
        </View>
      </SafeAreaView>
    );
}

export default PreferencesScreen;