import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, IconButton } from 'react-native-paper';
import { colors } from '../theme/colors';
import Icon from '../design-system/Icon';
import { layout } from '../theme/layout';
import { useRouter } from '../app/router/RouterProvider';

export default function AccountScreen() {
  const { goBack } = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <IconButton icon={(props) => <Icon name="chevron-left" color={props.color} size={24} />} onPress={goBack} />
        <Text style={styles.title}>Minha Conta</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Top profile section (placeholder image from FIGMA template should be placed here) */}
        <View style={styles.profileCard}>
          <View style={styles.avatarPlaceholder}>
            <Icon name="account-circle-outline" size={64} color={colors.textPrimary} />
          </View>
          <Text style={styles.name}>Monica Silva</Text>
          <Text style={styles.sub}>monica@email.com</Text>
        </View>

        {/* Account actions (placeholders based on typical FIGMA User Account templates) */}
        <View style={styles.section}>
          <Button mode="outlined" icon={() => <Icon name="pencil" />} style={styles.action}>Editar Perfil</Button>
          <Button mode="outlined" icon={() => <Icon name="shield-check" />} style={styles.action}>Ver Identidade</Button>
          <Button mode="outlined" icon={() => <Icon name="logout" />} style={styles.action}>Sair</Button>
        </View>

        {/* Additional content placeholder */}
        <View style={{ height: 200 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: layout.screenPadding, paddingTop: 8 },
  title: { color: colors.textPrimary, fontSize: 18, fontWeight: '700' },
  content: { padding: layout.screenPadding, paddingTop: 16 },
  profileCard: { alignItems: 'center', paddingVertical: 18, backgroundColor: colors.headerBackground, borderRadius: 12, marginBottom: 12 },
  avatarPlaceholder: { width: 88, height: 88, borderRadius: 44, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  name: { color: colors.textPrimary, fontSize: 18, fontWeight: '700', marginTop: 8 },
  sub: { color: colors.textMuted, fontSize: 13, marginTop: 4 },
  section: { marginTop: 12, gap: 8 },
  action: { marginVertical: 6 },
});
