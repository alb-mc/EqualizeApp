import React from 'react';
import type { RouteName } from './types';
import LoginScreen from '../../screens/LoginScreen';
import MainScreen from '../../screens/MainScreen';
import NextScreen from '../../screens/NextScreen';
import { useRouter } from './RouterProvider';
import MessagesScreen from '../../screens/MessagesScreen';
import AccountScreen from '../../screens/AccountScreen';
import Cuidados from '../../screens/CareScreen';

const screens: Record<RouteName, React.ComponentType> = {
  Login: () => {
    const { navigate } = useRouter();
    return <LoginScreen onEnter={() => navigate('Main')} />;
  },
  Main: MainScreen,
  Next: NextScreen,
  Messages: MessagesScreen,
  Account: AccountScreen,
  Care: Cuidados,
};

export default function ScreenRegistry() {
  const { current } = useRouter();
  const Screen = screens[current];
  return <Screen />;
}
