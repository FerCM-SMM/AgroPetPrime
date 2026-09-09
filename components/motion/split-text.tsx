'use client';

import { useEffect, useRef, useState } from 'react';

interface SplitTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  staggerMs?: number;
  highlightWord?: string;
  highlightClassName?: string;
}

export function SplitText({
  text,
  as: Component = 'h2',
  className = '',
  staggerMs = 30,
  highlightWord,
  highlightClassName = 'text-[#20BEE2]',
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const wordItems = text.split(' ').map((word, index) => ({
    key: `word-${index}-${word}`,
    word,
    index,
  }));

  return (
    // biome-ignore lint/suspicious/noExplicitAny: polymorphic heading component ref
    <Component ref={containerRef as any} className={`inline-block ${className}`} aria-label={text}>
      {wordItems.map(({ key, word, index }) => {
        const isHighlight =
          highlightWord && word.toLowerCase().includes(highlightWord.toLowerCase());

        return (
          <span key={key} className="inline-block overflow-hidden align-top mr-[0.28em] last:mr-0">
            <span
              style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(115%)',
                transition: `transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${index * staggerMs}ms`,
              }}
              className={`inline-block will-change-transform ${
                isHighlight ? highlightClassName : ''
              }`}
            >
              {word}
            </span>
          </span>
        );
      })}
    </Component>
  );
}
