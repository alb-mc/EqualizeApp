import React from 'react';
import { View, StyleSheet, ScrollView, PanResponder, GestureResponderEvent, PanResponderGestureState } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from '../theme/colors';
import MessagesSection from '../components/MessagesSection';
import { useHomeViewModel } from '../viewmodels/useHomeViewModel';
import AppHeader from '../components/AppHeader';
import { useRouter } from '../app/router/RouterProvider';

export default function MessagesScreen() {
  const { data } = useHomeViewModel();
  const { goBack, canGoBack } = useRouter();

  // Edge-swipe back (da esquerda para direita)
  const panResponder = React.useMemo(() =>
    PanResponder.create({
      onMoveShouldSetPanResponder: (_: GestureResponderEvent, s: PanResponderGestureState) => {
        // gesto lateral com início na borda esquerda e movimento horizontal > vertical
        const edgeStart = s.moveX <= 24; // 24px da borda
        const horizontal = Math.abs(s.dx) > Math.abs(s.dy) && s.dx > 30;
        return edgeStart && horizontal;
      },
      onPanResponderRelease: () => {
        if (canGoBack) goBack();
      },
    }),
  [canGoBack, goBack]);
  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <AppHeader
        greeting="Olá,"
        name="Monica!"
        unreadCount={data?.unreadCount}
        onPressMessages={() => {}}
        showBack={canGoBack}
        onPressBack={goBack}
      />
      <ScrollView contentContainerStyle={styles.scroll}>
        {data?.messages?.length ? (
          <MessagesSection messages={data.messages} />
        ) : (
          <Text style={styles.empty}>Sem mensagens</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingBottom: 80 },
  empty: { color: colors.textMuted, marginTop: 16, paddingHorizontal: 16 },
});
