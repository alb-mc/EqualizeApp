import { Platform } from 'react-native';

export const shadow = {
  card: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOpacity: 0.25,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
    },
    android: { elevation: 2 },
    default: {},
  }),
  floating: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOpacity: 0.35,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 8 },
    },
    android: { elevation: 6 },
    default: {},
  }),
} as const;
