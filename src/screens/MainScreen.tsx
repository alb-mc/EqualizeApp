import React from 'react';
import { View, StyleSheet, ScrollView, FlatList, NativeScrollEvent, NativeSyntheticEvent, TouchableOpacity, LayoutChangeEvent, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Badge, IconButton } from 'react-native-paper';
import { colors } from '../theme/colors';
import { RoundedCard, Divider } from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import ListRow from '../components/ListRow';
import PromoBanner from '../components/PromoBanner';
import Icon from '../design-system/Icon';
import ResultCard from '../components/ResultCard';
import { useHomeViewModel } from '../viewmodels/useHomeViewModel';
import BottomNavbar from '../components/BottomNavbar';
import MediaHero from '../components/MediaHero';
import ProcedureSection from '../components/ProcedureSection';
import { layout } from '../theme/layout';
import { easeNextLayout } from '../utils/animations';
import MessagesSection from '../components/MessagesSection';
import { useRouter } from '../app/router/RouterProvider';
import AppHeader from '../components/AppHeader';
import NextProcedureSection from '../components/NextProcedureSection';

export default function MainScreen() {
  const { data: state } = useHomeViewModel();
  const { navigate } = useRouter();
  const [current, setCurrent] = React.useState(0);
  const [floatH, setFloatH] = React.useState(0);
  const [headerH, setHeaderH] = React.useState(0);
  const ITEM_WIDTH = layout.carouselItemWidth;
  const SEPARATOR = layout.carouselSeparator;
  const SIDE_SPACING = layout.carouselSeparator;
  const listRef = React.useRef<FlatList>(null);
  const { width } = useWindowDimensions();
  const inset = Math.max(SIDE_SPACING, (width - ITEM_WIDTH) / 2);
  // Calcula a posição superior do card flutuante com base nas medidas reais
  const floatTop = React.useMemo(() => {
    if (headerH && floatH) return Math.max(12, headerH - floatH / 2);
    if (headerH) return Math.max(12, headerH - 40); // fallback aproximado antes de medir o card
    return 68; // valor inicial até obter medidas
  }, [headerH, floatH]);
  return (
    <View style={styles.container}>
      <AppHeader
        greeting="Olá,"
        name="Monica!"
        unreadCount={state?.unreadCount}
        onPressMessages={() => navigate('Messages')}
        onLayout={(e) => { easeNextLayout(); setHeaderH(e.nativeEvent.layout.height); }}
      />
      {/* Section flutuante: Próximo procedimento (fora do Header) */}
      <View style={[styles.floatingCard, { top: floatTop }]}> 
        <NextProcedureSection
          dateLabel={state?.upcoming.dateLabel}
          name={state?.upcoming.name}
          onMeasured={(h) => { easeNextLayout(); setFloatH(h); }}
        />
      </View>

  <ScrollView contentContainerStyle={[
          styles.scroll,
          { paddingTop: headerH + (floatH ? floatH / 2 : 40) + 12 }, // respiro um pouco maior abaixo do card
        ]}>
  {/* Mensagens ficam apenas na tela dedicada de Mensagens */}
        <SectionHeader title="Novidades para você!" action={<Text accessibilityRole="button" style={styles.actionLink}>Ver mais</Text>} />
        <PromoBanner />
        <View style={{ paddingHorizontal: 16 }}>
          <Divider />
        </View>
        <SectionHeader title="Resultados" icon={<Icon name="stethoscope" />} />
        {/* Linha 1: carrossel de miniaturas (snapping) */}
  <FlatList
          ref={listRef}
          data={state?.results ?? []}
          keyExtractor={(_, i) => `res-${i}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
          renderItem={({ item }) => <ResultCard uri={item.imageUrl} dateLabel={item.dateLabel} style={styles.thumb} />}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          ListHeaderComponent={<View style={{ width: inset }} />}
          ListFooterComponent={<View style={{ width: inset }} />}
          snapToInterval={ITEM_WIDTH + SEPARATOR}
          snapToAlignment="center"
          decelerationRate="fast"
          disableIntervalMomentum
          onMomentumScrollEnd={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
            const x = e.nativeEvent.contentOffset.x;
            const effective = Math.max(0, x - inset);
            const idx = Math.round(effective / (ITEM_WIDTH + SEPARATOR));
            setCurrent(idx);
          }}
        />
        {/* Dots */}
        {!!(state?.results?.length) && (
          <View style={styles.dots}>
            {state!.results.map((_, i) => (
              <TouchableOpacity
                key={`dot-${i}`}
                activeOpacity={0.8}
                onPress={() => listRef.current?.scrollToOffset({ offset: i * (ITEM_WIDTH + SEPARATOR), animated: true })}
                accessibilityRole="button"
                accessibilityLabel={`Ir para resultado ${i + 1} de ${state!.results.length}`}
              >
                <View style={[styles.dot, i === current && styles.dotActive]} />
              </TouchableOpacity>
            ))}
          </View>
        )}
        {/* Linha 2: mídia grande (futuro vídeo) */}
        <View style={styles.heroWrapper}>
          <MediaHero
            uri={(state?.results?.[0]?.imageUrl) ?? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=60&auto=format&fit=crop'}
            videoUri={"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
            loop
            muted
          />
        </View>

        {/* Novas seções: Cuidados, Regeneração, Manutenção */}
        {!!state && (
          <>
            <ProcedureSection title="Cuidados" iconName="molecule" items={state.care} />
            <ProcedureSection title="Regeneração" iconName="arrow-collapse-vertical" items={state.regeneration} />
            <ProcedureSection title="Manutenção" iconName="account-cog-outline" items={state.maintenance} />
          </>
        )}
      </ScrollView>
      <BottomNavbar
        items={[
          { key: 'home', label: 'Página Inicial', icon: 'home-outline' },
          { key: 'identity', label: 'Identidade', icon: 'face-man-outline' },
          { key: 'care', label: 'Cuidados', icon: 'molecule' },
          { key: 'regen', label: 'Regeneração', icon: 'arrow-collapse-vertical' },
          { key: 'maint', label: 'Manutenção', icon: 'account-cog-outline' },
          { key: 'checks', label: 'Checkups', icon: 'clipboard-pulse-outline' },
          { key: 'trail', label: 'Trilha', icon: 'map-marker-path' },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
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
  scroll: { padding: layout.screenPadding, paddingBottom: 120, paddingTop: 100 },
  cardBlock: { paddingBottom: 16 },
  actionLink: { color: colors.textMuted },
  carousel: { paddingHorizontal: 12, paddingBottom: 8, paddingTop: 8 },
  thumb: { width: 180 },
  heroWrapper: { paddingHorizontal: 12, marginTop: 12, marginBottom: 8 },
  dots: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6, paddingVertical: 6 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#556963' },
  dotActive: { backgroundColor: '#BFD5CD', width: 8, height: 8, borderRadius: 4 },
  floatingCard: {
    position: 'absolute',
    left: layout.floatingHorizontal,
    right: layout.floatingHorizontal,
    backgroundColor: colors.surfaceAlt,
    borderRadius: layout.floatingCardRadius,
  borderWidth: 1,
  borderColor: '#2E3B37',
  overflow: 'hidden',
  paddingBottom: 6,
    
  // sombra para flutuar sobre o conteúdo
    shadowColor: '#000',
    shadowOpacity: 0.28,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  zIndex: 20,
  },
});
