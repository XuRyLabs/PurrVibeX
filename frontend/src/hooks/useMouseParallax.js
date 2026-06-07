import { useCallback, useEffect, useRef } from 'react';

/**
 * Applies a gentle mouse-driven parallax transform to a target element.
 * @param {number} strength – max pixel offset (default 14)
 * @returns {{ ref, onMouseMove, onMouseLeave }}
 */
export function useMouseParallax(strength = 14) {
  const ref = useRef(null);
  const frame = useRef(null);
  const current = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  const lerp = (a, b, t) => a + (b - a) * t;

  const tick = useCallback(() => {
    current.current.x = lerp(current.current.x, target.current.x, 0.1);
    current.current.y = lerp(current.current.y, target.current.y, 0.1);

    if (ref.current) {
      ref.current.style.transform =
        `translate(${current.current.x}px, ${current.current.y}px)`;
    }

    const dx = Math.abs(target.current.x - current.current.x);
    const dy = Math.abs(target.current.y - current.current.y);
    if (dx > 0.05 || dy > 0.05) {
      frame.current = requestAnimationFrame(tick);
    }
  }, []);

  const onMouseMove = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = (e.clientX - cx) / (rect.width / 2);
      const ny = (e.clientY - cy) / (rect.height / 2);
      target.current = { x: nx * strength, y: ny * strength };

      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(tick);
    },
    [strength, tick]
  );

  const onMouseLeave = useCallback(() => {
    target.current = { x: 0, y: 0 };
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(tick);
  }, [tick]);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches && ref.current) {
      ref.current.style.transform = '';
    }
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}

