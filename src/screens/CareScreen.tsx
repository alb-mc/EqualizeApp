import React from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import Icon from '../design-system/Icon';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';
import BottomNavbar from '../components/BottomNavbar';
import { useRouter } from '../app/router/RouterProvider';

const data = [
  { id: '1', title: 'Body Oil Wash', price: '$18', tag: 'NEW', img: null },
  { id: '2', title: 'Ultralip', price: '$18', tag: 'NEW', img: null },
  { id: '3', title: 'Good Skin Club', price: '$18', tag: 'NEW', img: null },
  { id: '4', title: 'Green Serum', price: '$18', tag: 'NEW', img: null },
];

function Item({ item }: { item: any }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardImage}>
        {/* Placeholder circle / img */}
        <Icon name="image-outline" size={28} color={colors.textMuted} />
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardPrice}>{item.price}</Text>
      </View>
    </View>
  );
}

export default function Cuidados() {
  const { navigate } = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>skincare</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(i) => i.id}
        numColumns={2}
        contentContainerStyle={[styles.list, { paddingBottom: 140 }]}
        renderItem={({ item }) => <Item item={item} />}
      />

      <BottomNavbar
        items={[
          { key: 'home', label: 'Página Inicial', icon: 'home-outline', onPress: () => navigate('Main') },
          { key: 'identity', label: 'Identidade', icon: 'face-man-outline' },
          { key: 'care', label: 'Cuidados', icon: 'molecule', onPress: () => navigate('Care') },
          { key: 'regen', label: 'Regeneração', icon: 'arrow-collapse-vertical', onPress: () => navigate('Next') },
          { key: 'maint', label: 'Manutenção', icon: 'account-cog-outline' },
          { key: 'checks', label: 'Checkups', icon: 'clipboard-pulse-outline' },
          { key: 'trail', label: 'Trilha', icon: 'map-marker-path' },
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  hero: { height: 120, margin: 12, borderRadius: 12, backgroundColor: '#4A4E39', alignItems: 'center', justifyContent: 'center' },
  heroTitle: { color: '#fff', fontSize: 32, fontWeight: '700' },
  list: { paddingHorizontal: layout.screenPadding, paddingTop: 12, paddingBottom: 60 },
  card: { flex: 1, margin: 8, backgroundColor: colors.surface, borderRadius: 12, padding: 12, minHeight: 140 },
  cardImage: { height: 80, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: 8, marginBottom: 8 },
  cardBody: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { color: colors.textPrimary, fontWeight: '700' },
  cardPrice: { color: '#F36B37', fontWeight: '700' },
});
