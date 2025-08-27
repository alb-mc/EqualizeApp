import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import SectionHeader from './SectionHeader';
import { RoundedCard } from './Card';
import ListRow from './ListRow';
import Icon from '../design-system/Icon';
import { colors } from '../theme/colors';
import type { ProcedureItem } from '../domain/home/types';
import type { MaterialCommunityIcons } from '@expo/vector-icons';
import { DefaultStatusIconStrategy } from './status/StatusIcon';

export type ProcedureSectionProps = {
  title: string;
  iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  items: ProcedureItem[];
};

const statusStrategy = new DefaultStatusIconStrategy();

function StatusBadge({ status }: { status: ProcedureItem['status'] }) {
  return (
    <View style={styles.badge} accessibilityLabel={`Status: ${status}`} accessibilityRole="image">
      {statusStrategy.render(status)}
    </View>
  );
}

export default function ProcedureSection({ title, iconName, items }: ProcedureSectionProps) {
  return (
    <View style={styles.section}>
      <SectionHeader
        title={title}
        icon={<Icon name={iconName} color={colors.brandSoft} size={18} />}
  action={<Text style={styles.viewAll}>Ver todos</Text>}
      />
      <View style={styles.list}>
        {items.map((it, idx) => (
          <RoundedCard key={`${title}-${idx}`} style={styles.cardItem}>
            <ListRow title={it.title} subtitle={it.dateLabel} right={<StatusBadge status={it.status} />} />
          </RoundedCard>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 12, marginTop: 8 },
  viewAll: { color: colors.textMuted },
  list: { gap: 10, marginTop: 6 },
  cardItem: { borderRadius: 12 },
  badge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardOutline,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
