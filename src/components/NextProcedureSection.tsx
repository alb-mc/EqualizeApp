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
  <SectionHeader title="Próximo procedimento:" style={styles.sectionHeader} />
  <ListRow left={<Icon name="calendar-month-outline" size={28} />} title={dateLabel} subtitle={name} actionLabel="Mais informações" />
      </RoundedCard>
    </View>
  );
}

const styles = StyleSheet.create({
  // wrapper sem padding horizontal para que o cartão interno possa preencher até as laterais
  wrapper: { paddingHorizontal: 0 },
  card: {
  // tornar o cartão mais escuro e fosco
  backgroundColor: 'rgba(0,0,0,0.50)',
  borderRadius: 0,
    // borda visível, suave
    borderWidth: 1,
  // borda escura sutil
  borderColor: 'rgba(0,0,0,0.35)',
    overflow: 'hidden',
  paddingTop: 8, // espaço interno adicionado equivalente ao gap removido
  paddingBottom: 8,
  // deixar um pequeno padding interno nas laterais para o conteúdo não encostar na borda
  paddingHorizontal: 14,
    // sombra para dar profundidade ao cartão
    shadowColor: '#000',
    shadowOpacity: 0.32,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  sectionHeader: {
    paddingHorizontal: 10,
    // reduzir o marginLeft do título interno
    // o SectionHeader usa marginLeft via styles.title (spacing.sm)
    // aqui reduzimos o padding horizontal geral para aproximar o título da esquerda
  },
});
