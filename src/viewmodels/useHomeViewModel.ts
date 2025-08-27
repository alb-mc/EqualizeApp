import React from 'react';
import type { HomeData } from '../domain/home/types';
import { useUseCases } from '../providers/UseCasesProvider';

export function useHomeViewModel() {
  const { getHomeData } = useUseCases();
  const [data, setData] = React.useState<HomeData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getHomeData
      .execute()
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch((e) => !cancelled && setError(String(e)))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [getHomeData]);

  return { data, loading, error } as const;
}
