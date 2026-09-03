'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AnimatedWrapperProps {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
}

export function AnimatedWrapper({ children, delayMs = 0, className = '' }: AnimatedWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (domRef.current) observer.unobserve(domRef.current);
          }
        });
      },
      { threshold: 0.1, rootMargin: '40px' }
    );

    const currentEl = domRef.current;
    if (currentEl) observer.observe(currentEl);

    return () => {
      if (currentEl) observer.unobserve(currentEl);
    };
  }, []);

  return (
    <div
      ref={domRef}
      style={{
        transitionDelay: `${delayMs}ms`,
        transitionDuration: '350ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`transition-all ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
    >
      {children}
    </div>
  );
}
