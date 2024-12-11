import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const isReactNative = Platform.OS !== 'web';

export const getItem = async (key) => {
  if (isReactNative) {
    const value = await AsyncStorage.getItem(key);
    return JSON.parse(value || '[]');
  }
  return JSON.parse(localStorage.getItem(key) || '[]');
};

export const setItem = async (key, value) => {
  if (isReactNative) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};