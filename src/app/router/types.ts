export type RouteName = 'Login' | 'Main' | 'Next' | 'Messages';

export type Navigate = (to: RouteName) => void;
export type GoBack = () => void;

export interface Router {
  current: RouteName;
  navigate: Navigate;
  goBack: GoBack;
  canGoBack: boolean;
}
