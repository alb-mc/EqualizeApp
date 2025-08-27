import { Platform, UIManager, LayoutAnimation } from 'react-native';

export function enableLayoutAnimations() {
  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export function easeNextLayout() {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
}
