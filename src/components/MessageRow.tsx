import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from '../theme/colors';
import Icon from '../design-system/Icon';
import type { MessageItem } from '../domain/home/types';
import { layout } from '../theme/layout';

export type MessageRowProps = {
  message: MessageItem;
};

export default function MessageRow({ message }: MessageRowProps) {
  const isUnread = !message.read;
  return (
    <View style={styles.row}>
      <View style={styles.titleRow}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.title, isUnread ? styles.titleUnread : styles.titleRead]}>
          {message.title}
        </Text>
        <View style={styles.rightIcons}>
          {isUnread && <View style={styles.unreadDot} />}
          <Icon name="chevron-right" size={20} color={colors.textMuted} />
        </View>
      </View>
      <Text style={[styles.date, isUnread && styles.dateUnread]}>{message.dateLabel}</Text>
      <Text numberOfLines={2} ellipsizeMode="tail" style={[styles.preview, isUnread ? styles.previewUnread : styles.previewRead]}>
        {message.preview}
      </Text>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { paddingHorizontal: layout.screenPadding, paddingVertical: 14 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rightIcons: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  unreadDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: colors.textPrimary, opacity: 0.9 },
  title: { fontSize: 18, letterSpacing: 0.15 },
  titleUnread: { color: colors.textPrimary, fontWeight: '800' },
  titleRead: { color: colors.textMuted, fontWeight: '700' },
  date: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  dateUnread: { color: colors.brandSoft },
  preview: { marginTop: 6, fontSize: 13, lineHeight: 19 },
  previewUnread: { color: colors.textPrimary, opacity: 0.85 },
  previewRead: { color: colors.textMuted, opacity: 0.8 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.divider, marginTop: 14 },
});
