import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from '../theme/colors';

export default function NextScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Próxima página</Text>
      <Text style={{ marginTop: 8 }}>Este é apenas um placeholder.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
