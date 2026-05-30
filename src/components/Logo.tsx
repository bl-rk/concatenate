import React from 'react';
import Svg, { Rect } from 'react-native-svg';
import { theme } from '../theme';

export const Logo = ({ size = 72 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Rect x="8" y="42" width="84" height="16" rx="8" fill={theme.colors.greyDark} />
    <Rect x="42" y="8" width="16" height="84" rx="8" fill={theme.colors.accent} />
  </Svg>
);