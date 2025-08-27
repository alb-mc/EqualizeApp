import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  size?: number;
  color?: string;
  style?: object;
};

export default function Icon({ name, size = 22, color = '#fff', style }: Props) {
  return <MaterialCommunityIcons name={name} size={size} color={color} style={style} />;
}
