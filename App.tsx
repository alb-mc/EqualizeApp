import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import AppProviders from './src/app/AppProviders';
import { RouterProvider } from './src/app/router/RouterProvider';
import ScreenRegistry from './src/app/router/ScreenRegistry';
import { enableLayoutAnimations } from './src/utils/animations';

export default function App() {
  React.useEffect(() => {
    enableLayoutAnimations();
  }, []);
  return (
    <AppProviders>
      <RouterProvider>
        <ScreenRegistry />
      </RouterProvider>
      <StatusBar style="light" />
    </AppProviders>
  );
}

const styles = StyleSheet.create({});
