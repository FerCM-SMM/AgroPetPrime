'use client';

import { useEffect, useRef, useState } from 'react';

export type CursorMode = 'default' | 'pointer' | 'magic' | 'drag';

export function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<CursorMode>('default');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || isCoarse || prefersReducedMotion) {
      return;
    }

    setEnabled(true);

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let rafId: number | null = null;
    let isMoving = false;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const updatePosition = () => {
      // Voldog lerp physics: / 6 gives the characteristic luxury elasticity
      currentX += (targetX - currentX) / 6;
      currentY += (targetY - currentY) / 6;

      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;

      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        rafId = requestAnimationFrame(updatePosition);
      } else {
        rafId = null;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isMoving) {
        isMoving = true;
        setVisible(true);
      }
      if (!rafId) {
        rafId = requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const dragTarget = target.closest("[data-cursor='drag'], .cursor-drag, .carousel-drag");
      const magicTarget = target.closest("[data-cursor='magic'], .magic-hover, #hero-pitbull");
      const pointerTarget = target.closest(
        "a, button, [role='button'], input, select, textarea, [data-cursor='pointer']",
      );

      if (dragTarget) {
        setMode('drag');
      } else if (magicTarget) {
        setMode('magic');
      } else if (pointerTarget) {
        setMode('pointer');
      } else {
        setMode('default');
      }
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  const modeStyles: Record<CursorMode, string> = {
    default: 'w-4 h-4 bg-[#20BEE2] shadow-[0_0_15px_rgba(32,190,226,0.6)] rounded-full',
    pointer: 'w-12 h-12 bg-[#20BEE2]/25 border-2 border-[#20BEE2] rounded-full backdrop-blur-[1px]',
    magic: 'w-20 h-20 bg-white mix-blend-difference rounded-full',
    drag: 'w-28 h-10 bg-[#20BEE2] text-black font-black text-[11px] tracking-widest rounded-full shadow-[0_4px_20px_rgba(32,190,226,0.4)] uppercase flex items-center justify-center gap-1.5',
  };

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        opacity: visible ? 1 : 0,
        transition:
          'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease, background-color 0.2s ease, border-color 0.2s ease',
      }}
      className={`fixed top-0 left-0 pointer-events-none z-9999 will-change-transform flex items-center justify-center transition-all ${modeStyles[mode]}`}
    >
      {mode === 'drag' && (
        <span
          ref={labelRef}
          className="select-none flex items-center gap-1 font-bold animate-pulse"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M8 7l-5 5m0 0l5 5m-5-5h18m-5-5l5 5m0 0l-5 5"
            />
          </svg>
          ARRASTE
        </span>
      )}
    </div>
  );
}
