import { useEffect, useRef } from 'react';

export function useScrollTop() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
}

export function useDocTitle(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | AURELIA` : 'AURELIA – Fine Jewellery';
    const meta = document.querySelector('meta[name="description"]');
    if (meta && description) meta.setAttribute('content', description);
  }, [title, description]);
}

export function useHeaderScroll() {
  useEffect(() => {
    const header = document.querySelector('header');
    if (!header) return;

    const onScroll = () => {
      if (window.scrollY > 60) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

export function useCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const move = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    const enter = () => cursor.classList.add('hovering');
    const leave = () => cursor.classList.remove('hovering');

    window.addEventListener('mousemove', move);

    const interactives = document.querySelectorAll('a, button, [data-cursor]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });

    return () => {
      window.removeEventListener('mousemove', move);
    };
  }, []);

  return cursorRef;
}

export function useLazyImage(ref) {
  useEffect(() => {
    const el = ref?.current;
    if (!el) return;

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      obs.observe(el);
      return () => obs.disconnect();
    } else {
      el.classList.add('loaded');
    }
  }, [ref]);
}
