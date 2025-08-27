import React from 'react';
import { Button as PaperButton, ButtonProps } from 'react-native-paper';

export function PrimaryButton(props: ButtonProps) {
  return <PaperButton mode="contained" {...props} />;
}
