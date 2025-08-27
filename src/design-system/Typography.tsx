import React from 'react';
import { Text as PaperText } from 'react-native-paper';
import GradientText from '../components/GradientText';
import { colors } from '../theme/colors';

type PaperTextProps = React.ComponentProps<typeof PaperText>;

export function TitleMuted(props: PaperTextProps) {
  return <PaperText {...props} />;
}

export function BrandGradientTitle({ children, ...rest }: PaperTextProps & { children: React.ReactNode }) {
  return (
    <GradientText colors={[colors.brandGradientStart, colors.brandGradientEnd]} style={rest.style} {...rest}>
      {children}
    </GradientText>
  );
}
