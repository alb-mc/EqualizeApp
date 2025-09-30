import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button } from 'react-native-paper';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';
import Icon from '../design-system/Icon';
import BottomNavbar from '../components/BottomNavbar';
import { useRouter } from '../app/router/RouterProvider';

export default function CheckUps() {
  const { navigate } = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good Morning,</Text>
        <Text style={styles.name}>Aashifa Sheikh</Text>
        <View style={styles.notif}>
          <Icon name="bell-outline" size={20} color="#2F9CFF" />
        </View>
      </View>

      <View style={styles.heroCard}>
        <View style={styles.heroLeft}>
          <Text style={styles.heroTime}>11:00 AM</Text>
          <Text style={styles.heroSub}>200ml water (2 Glass)</Text>
          <Button mode="contained" style={styles.ctaSmall}>Add Your Goal</Button>
        </View>
        <View style={styles.heroRight}>
          {/* Placeholder droplet */}
          <View style={styles.droplet} />
        </View>
      </View>

      <View style={styles.cardsRow}>
        <View style={styles.progressCircle}>
          <Text style={styles.progressText}>500ml</Text>
        </View>
        <View style={styles.smallCards}>
          <View style={styles.smallCard}>
            <Text style={styles.smallTime}>9:30 AM</Text>
            <Text style={styles.smallVal}>100ml</Text>
          </View>
          <View style={[styles.smallCard, styles.targetCard]}>
            <Text style={styles.smallLabel}>Target</Text>
            <Text style={styles.smallVal}>2000ml</Text>
          </View>
        </View>
      </View>

      <View style={[styles.ctaWrap, { paddingBottom: 140 }]}> 
        <Button mode="contained" style={styles.cta}>Go To Dashboard</Button>
        <Text style={styles.ctaNote}>You got 50% of today's goal, keep focus on your health!</Text>
      </View>

      <BottomNavbar
        items={[
          { key: 'home', label: 'Página Inicial', icon: 'home-outline', onPress: () => navigate('Main') },
          { key: 'identity', label: 'Identidade', icon: 'face-man-outline', onPress: () => navigate('Account') },
          { key: 'care', label: 'Cuidados', icon: 'molecule', onPress: () => navigate('Care') },
          { key: 'regen', label: 'Regeneração', icon: 'arrow-collapse-vertical' },
          { key: 'maint', label: 'Manutenção', icon: 'account-cog-outline' },
          { key: 'checks', label: 'Checkups', icon: 'clipboard-pulse-outline', onPress: () => navigate('Checkups') },
          { key: 'trail', label: 'Trilha', icon: 'map-marker-path' },
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: layout.screenPadding, paddingTop: 18, paddingBottom: 8 },
  greeting: { color: '#9FB6CE', fontSize: 14 },
  name: { color: '#142535', fontSize: 20, fontWeight: '700', marginTop: 6 },
  notif: { position: 'absolute', right: layout.screenPadding, top: 18, width: 36, height: 36, borderRadius: 18, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },

  heroCard: { margin: 16, backgroundColor: '#fff', borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.04, elevation: 2 },
  heroLeft: { flex: 1 },
  heroTime: { fontSize: 18, fontWeight: '700', color: '#142535' },
  heroSub: { color: '#7FAFD0', marginTop: 6 },
  ctaSmall: { marginTop: 12, alignSelf: 'flex-start', backgroundColor: '#E1F6FF' },
  heroRight: { width: 100, alignItems: 'center', justifyContent: 'center' },
  droplet: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#2F9CFF', transform: [{ rotate: '20deg' }] },

  cardsRow: { flexDirection: 'row', paddingHorizontal: layout.screenPadding, marginTop: 8, gap: 12 },
  progressCircle: { width: 140, height: 140, borderRadius: 70, backgroundColor: '#E6F5FF', alignItems: 'center', justifyContent: 'center' },
  progressText: { fontSize: 20, fontWeight: '700', color: '#2F9CFF' },
  smallCards: { flex: 1, justifyContent: 'space-between' },
  smallCard: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.03, elevation: 1 },
  smallTime: { color: '#7FAFD0' },
  smallVal: { fontWeight: '700', marginTop: 6 },
  smallLabel: { color: '#7FAFD0' },
  targetCard: { backgroundColor: '#fff' },

  ctaWrap: { paddingHorizontal: layout.screenPadding, marginTop: 16, alignItems: 'center' },
  cta: { backgroundColor: '#31B9FF', width: '80%', alignSelf: 'center' },
  ctaNote: { color: '#7FAFD0', marginTop: 8, textAlign: 'center' },
});

