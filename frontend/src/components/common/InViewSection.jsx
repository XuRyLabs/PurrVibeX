import { useInView } from '../../hooks/useInView.js';

/**
 * Wraps children in a div that fades/slides up once it enters the viewport.
 * @param {{ className?: string, delay?: number, children: React.ReactNode }} props
 */
export default function InViewSection({ className = '', delay = 0, children }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={`inview-section ${inView ? 'inview-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

