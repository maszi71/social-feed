import { useEffect, useRef } from 'react';

type Options = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
};

export function useIntersectionObserver(
  onIntersect: () => void,
  enabled: boolean = true,
  options: Options = {}
) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = observerRef.current;
    if (!enabled || !target) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) onIntersect();
    }, options);

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [onIntersect, enabled, options]);

  return observerRef;
}
