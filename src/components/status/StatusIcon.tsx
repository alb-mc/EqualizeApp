import React from 'react';
import Icon from '../../design-system/Icon';
import { colors } from '../../theme/colors';
import type { ProcedureItem } from '../../domain/home/types';

export interface StatusIconStrategy {
  render(status: ProcedureItem['status']): React.ReactNode;
}

export class DefaultStatusIconStrategy implements StatusIconStrategy {
  render(status: ProcedureItem['status']): React.ReactNode {
    const map = {
      scheduled: { name: 'calendar-month-outline' as const, color: colors.brandSoft },
      done: { name: 'check' as const, color: colors.brandSoft },
      cancelled: { name: 'close' as const, color: '#D96F6F' },
    };
    const cfg = map[status];
    return <Icon name={cfg.name} size={16} color={cfg.color} />;
  }
}
