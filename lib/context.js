import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_KEY = '3808e486-0b69-45ff-865d-667682f39a84'; 
export const API_URL = 'https://api.navitia.io/v1';

export const initContext = {
    storedAddresses: [],
    setStoredAddresses: () => { },
    storedFavoris: [],
    setStoredFavoris: () => { },
}

export const Context = React.createContext(initContext)

/* Adress section */

export const setAsyncStoredAddresses = (data) => {
    return AsyncStorage.setItem('storedAddresses', JSON.stringify(data)).catch(e => {
        console.log(e)
    }).then(() => getAsyncStoredAddresses())
}

export const getAsyncStoredAddresses = () => {
    return AsyncStorage.getItem('storedAddresses').then(data => {
        return JSON.parse(data) || []
    }).catch(e => {
        console.log(e)
    })
}

/* Favoris section */

export const setAsyncFavoris = (data) => {
    return AsyncStorage.setItem('favoris', JSON.stringify(data)).catch(e => {
        console.log(e)
    }).then(() => getAsyncFavoris())
}

export const getAsyncFavoris = () => {
    return AsyncStorage.getItem('favoris').then(data => {
        return JSON.parse(data) || []
    }).catch(e => {
        console.log(e)
    })
}
