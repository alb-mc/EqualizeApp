import React from 'react';
import { View, Image, StyleSheet, ViewProps } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from '../theme/colors';

type Props = ViewProps & {
  uri: string;
  dateLabel?: string;
};

export default function ResultCard({ uri, dateLabel, style, ...rest }: Props) {
  return (
    <View style={style} {...rest}>
      <View style={styles.container}>
        <Image source={{ uri }} style={styles.image} resizeMode="cover" />
      </View>
      {!!dateLabel && <Text style={styles.date}>{dateLabel}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { borderRadius: 12, overflow: 'hidden', backgroundColor: colors.surfaceAlt, borderWidth: 1, borderColor: colors.cardOutline },
  image: { width: '100%', height: '100%' },
  date: { color: colors.textMuted, fontSize: 10, marginTop: 6 },
});
