import React from 'react';
import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Badge, IconButton } from 'react-native-paper';
import { colors } from '../theme/colors';
import Icon from '../design-system/Icon';
import { layout } from '../theme/layout';

export type AppHeaderProps = {
  greeting: string;
  name: string;
  unreadCount?: number;
  onPressMessages: () => void;
  onPressProfile?: () => void;
  onLayout?: (e: LayoutChangeEvent) => void;
  showBack?: boolean;
  onPressBack?: () => void;
};

export default function AppHeader({ greeting, name, unreadCount = 0, onPressMessages, onPressProfile, onLayout, showBack, onPressBack }: AppHeaderProps) {
  return (
    <SafeAreaView style={styles.header} onLayout={onLayout}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {showBack && (
          <IconButton
            accessibilityLabel="Voltar"
            icon={(props) => <Icon name="chevron-left" color={props.color} size={24} />}
            iconColor={colors.textPrimary}
            size={24}
            onPress={onPressBack}
          />
        )}
        <Text style={styles.hello}>{greeting}</Text>
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.headerActions}>
        <View style={{ position: 'relative' }}>
          <IconButton
            accessibilityLabel="Mensagens"
            icon={(props) => <Icon name="email-outline" color={props.color} size={22} />}
            iconColor={colors.textPrimary}
            size={22}
            onPress={onPressMessages}
          />
          {!!unreadCount && <Badge style={styles.badge} size={16}>{unreadCount}</Badge>}
        </View>
        <IconButton
          accessibilityLabel="Perfil"
          icon={(props) => <Icon name="account-circle-outline" color={props.color} size={22} />}
          iconColor={colors.textPrimary}
          size={22}
          onPress={onPressProfile}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: layout.headerTopPadding,
    paddingHorizontal: layout.floatingHorizontal,
    paddingBottom: layout.headerBottomPadding,
    backgroundColor: colors.headerBackground,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hello: { color: colors.textPrimary, fontSize: 18, opacity: 0.95 },
  name: { color: colors.textPrimary, fontSize: 26, fontWeight: '700', letterSpacing: 0.2, marginTop: 2 },
  headerActions: { flexDirection: 'row', alignItems: 'center' },
  badge: { position: 'absolute', top: 4, right: 4, backgroundColor: '#D96F6F' },
});
