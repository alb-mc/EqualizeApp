import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import Icon from '../design-system/Icon';
import { colors } from '../theme/colors';

type NavItem = {
  key: string;
  label: string;
  icon: React.ComponentProps<typeof Icon>['name'];
  onPress?: () => void;
};

type Props = {
  items: NavItem[];
};

export default function BottomNavbar({ items }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        {items.map((it) => (
          <TouchableRipple key={it.key} onPress={it.onPress} borderless style={styles.itemTouchable}>
            <View style={styles.item}>
              <Icon name={it.icon} size={24} color={colors.navText} />
              <Text style={styles.label} numberOfLines={1} ellipsizeMode="clip" allowFontScaling={false}>
                {it.label}
              </Text>
            </View>
          </TouchableRipple>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 12,
    paddingBottom: Platform.select({ ios: 20, android: 12, default: 12 }),
    paddingTop: 8,
    backgroundColor: 'transparent',
  },
  inner: {
    backgroundColor: colors.navBackground,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  itemTouchable: { flex: 1, borderRadius: 12 },
  item: { alignItems: 'center', justifyContent: 'center' },
  label: { color: colors.navText, marginTop: 4, fontSize: 9, lineHeight: 11, maxWidth: 64, textAlign: 'center' },
});
