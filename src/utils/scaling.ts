// Proportional scaling utilities
// Reference: Desktop 1512px (MacBook Pro 14"), Mobile 390px (iPhone)
// Breakpoint threshold: 768px (md)

const DESKTOP_REF = 1512;
const MOBILE_REF = 390;

/** Single scaled value: vw(64) → 'calc(100vw * 64 / 1512)' */
export function vw(px: number, mode: 'desktop' | 'mobile' = 'desktop'): string {
  const ref = mode === 'desktop' ? DESKTOP_REF : MOBILE_REF;
  return `calc(100vw * ${px} / ${ref})`;
}

/** Responsive value: picks mobile or desktop calc based on isMobile flag */
export function rvw(mobilePx: number, desktopPx: number, isMobile: boolean): string {
  return isMobile ? vw(mobilePx, 'mobile') : vw(desktopPx, 'desktop');
}
