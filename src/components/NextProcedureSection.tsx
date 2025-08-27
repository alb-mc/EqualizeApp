import React from 'react';
import { View, StyleSheet, LayoutChangeEvent, ViewProps } from 'react-native';
import { colors } from '../theme/colors';
import { RoundedCard } from './Card';
import SectionHeader from './SectionHeader';
import ListRow from './ListRow';
import Icon from '../design-system/Icon';

type Props = ViewProps & {
  dateLabel?: string;
  name?: string;
  onMeasured?: (h: number) => void;
};

export default function NextProcedureSection({ dateLabel = '—', name = '', onMeasured, style, ...rest }: Props) {
  return (
    <View style={[styles.wrapper, style]} {...rest}>
      <RoundedCard
        style={styles.card}
        onLayout={(e: LayoutChangeEvent) => onMeasured?.(e.nativeEvent.layout.height)}
        accessibilityRole="summary"
        accessibilityLabel="Próximo procedimento"
      >
        <SectionHeader title="Próximo procedimento:" />
        <ListRow left={<Icon name="calendar-month-outline" />} title={dateLabel} subtitle={name} actionLabel="Mais informações" />
      </RoundedCard>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { paddingHorizontal: 12 },
  card: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2E3B37',
    overflow: 'hidden',
    paddingBottom: 8,
    // sombra para flutuar
    shadowColor: '#000',
    shadowOpacity: 0.24,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
});
