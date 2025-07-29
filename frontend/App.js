// frontend/App.js

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './screens/HomeScreen/HomeScreen';

export default function App() {
  return (
    <>
      <HomeScreen />
      <StatusBar style="auto" />
    </>
  );
}