'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';

interface AdmissionPediaSection2Props {
  currentContent: {
    title: string;
    titleFont: string;
    section: string;
    sectionFont: string;
    bodyFont: string;
    paragraph1: string;
    paragraph2: string;
  };
}

/* ---------------- Language-aware button config ---------------- */

type LocaleKey = 'en' | 'zh-cn' | 'zh-hk';

type ButtonCfg = {
  show: boolean;
  enabled: boolean;
  href: string;
  label: string;
  topTooltipEnabled: boolean;
  topTooltipLabel?: string;
  bottomTooltipEnabled: boolean;
  bottomTooltipLabel?: string;
};

const DEFAULT_TOP_TOOLTIP = {
  en: 'New version available below!',
  zh_cn: '请参见下方的新版本！',
  zh_hk: '請參見下方的新版本！',
};
const DEFAULT_BOTTOM_TOOLTIP = {
  en: 'Coming soon. Please refer to the Simplified Chinese version.',
  zh_cn: '即将推出。请参考简体中文版。',
  zh_hk: '即將推出。請參考簡體中文版。',
};

/** Per-locale button settings (update hrefs/labels as needed). 
 *  These point to 2025 PDFs by default; change paths if you want to reuse 2019 ones.
 */
const BUTTONS_BY_LOCALE: Record<
  LocaleKey,
  { cityu: ButtonCfg; columbia: ButtonCfg }
> = {
  en: {
    cityu: {
      show: false,
      enabled: false,
      href: '/pdfs/2025/volume_cityu.pdf',
      label: 'Volume of CityU',
      topTooltipEnabled: false,
      topTooltipLabel: DEFAULT_TOP_TOOLTIP.en,
      bottomTooltipEnabled: false,
      bottomTooltipLabel: DEFAULT_BOTTOM_TOOLTIP.en,
    },
    columbia: {
      show: true,
      enabled: false,
      href: '/pdfs/2025/volume_columbia.pdf',
      label: 'Volume of Columbia',
      topTooltipEnabled: false,
      topTooltipLabel: DEFAULT_TOP_TOOLTIP.en,
      bottomTooltipEnabled: true,
      bottomTooltipLabel: DEFAULT_BOTTOM_TOOLTIP.en,
    },
  },
  'zh-cn': {
    cityu: {
      show: false,
      enabled: false,
      href: '/pdfs/2025/zh-cn/volume_cityu.pdf',
      label: '城大卷',
      topTooltipEnabled: false,
      topTooltipLabel: DEFAULT_TOP_TOOLTIP.zh_cn,
      bottomTooltipEnabled: false,
      bottomTooltipLabel: DEFAULT_BOTTOM_TOOLTIP.zh_cn,
    },
    columbia: {
      show: true,
      enabled: true,
      href: '/pdfs/2025/zh-cn/volume_columbia.pdf',
      label: '哥大卷',
      topTooltipEnabled: false,
      topTooltipLabel: DEFAULT_TOP_TOOLTIP.zh_cn,
      bottomTooltipEnabled: false,
      bottomTooltipLabel: DEFAULT_BOTTOM_TOOLTIP.zh_cn,
    },
  },
  'zh-hk': {
    cityu: {
      show: false,
      enabled: false,
      href: '/pdfs/2025/zh-hk/volume_cityu.pdf',
      label: '城大卷',
      topTooltipEnabled: false,
      topTooltipLabel: DEFAULT_TOP_TOOLTIP.zh_hk,
      bottomTooltipEnabled: false,
      bottomTooltipLabel: DEFAULT_BOTTOM_TOOLTIP.zh_hk,
    },
    columbia: {
      show: true,
      enabled: false,
      href: '/pdfs/2025/zh-hk/volume_columbia.pdf',
      label: '哥大卷',
      topTooltipEnabled: false,
      topTooltipLabel: DEFAULT_TOP_TOOLTIP.zh_hk,
      bottomTooltipEnabled: true,
      bottomTooltipLabel: DEFAULT_BOTTOM_TOOLTIP.zh_hk,
    },
  },
};

export default function AdmissionPediaSection2({ currentContent }: AdmissionPediaSection2Props) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const rawLocale = (params.locale as string) || 'en';
  const locale: LocaleKey =
    rawLocale === 'zh-cn' ? 'zh-cn' : rawLocale === 'zh-hk' ? 'zh-hk' : 'en';

  const { cityu, columbia } = BUTTONS_BY_LOCALE[locale];

  // ---- Configurable constants ----
  const imageCount = 5;            // 2025 version has 5 images
  const IMAGE_SPACING_VH = 65;     // vertical spacing between images
  const LAST_IMAGE_STOP_VH = 10;   // last image should stop 10vh above bottom

  // Precompute distances: make sticky end exactly when the last image reaches 10vh
  const lastIndex = imageCount - 1;
  const scrollDistance = LAST_IMAGE_STOP_VH + lastIndex * IMAGE_SPACING_VH; // total travel for images
  const sectionHeightVh = scrollDistance; // match section height to travel -> no dead zone

  // Get appropriate image prefix based on locale
  const getImagePrefix = () => {
    switch (locale) {
      case 'zh-cn':
        return 'zh_cn_';
      case 'zh-hk':
        return 'zh_hk_';
      default:
        return 'en_';
    }
  };

  const getImagePath = (num: number) => {
    const prefix = getImagePrefix();
    return `/images/2025/${locale === 'zh-cn' ? 'zh-cn' : locale === 'zh-hk' ? 'zh-hk' : 'en'}/${prefix}${num}.png`;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Progress through the sticky span: 0 -> 1
      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        const sectionHeight = rect.height;
        const visibleFromTop = Math.abs(rect.top);
        const raw = visibleFromTop / (sectionHeight - windowHeight);
        setScrollProgress(Math.min(Math.max(raw, 0), 1));
      } else if (rect.top > 0) {
        setScrollProgress(0);
      } else {
        setScrollProgress(1);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-20"
      style={{ height: `${sectionHeightVh}vh` }}
    >
      {/* Fixed Video Background */}
      <div className="sticky top-0 w-full h-screen overflow-hidden z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/background3.mov" type="video/mp4" />
          <source src="/videos/background3.mov" type="video/quicktime" />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* Content overlay */}
        <div className="absolute inset-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-0 h-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
              {/* Left column - Text content */}
              <div className="col-span-2 space-y-6 flex flex-col justify-center">
                <h2
                  className="text-white font-bold"
                  style={{
                    fontFamily: currentContent.titleFont,
                    fontSize: '60px',
                  }}
                >
                  {currentContent.title}
                </h2>

                <div className="space-y-6 mt-12">
                  {/* Row: section text + download buttons aligned right */}
                  <div className="flex items-start gap-4">
                    <p
                      className="text-white text-lg leading-relaxed flex-1 min-w-0"
                      style={{ fontFamily: currentContent.sectionFont }}
                    >
                      {currentContent.section}
                    </p>

                    {/* Button group (right-aligned) */}
                    <div className="shrink-0 flex items-center gap-2 ml-2">
                      {/* CityU button (#BB3568) */}
                      {cityu.show && (
                        <DualTooltip
                          topEnabled={cityu.topTooltipEnabled}
                          topLabel={cityu.topTooltipLabel}
                          bottomEnabled={cityu.bottomTooltipEnabled}
                          bottomLabel={cityu.bottomTooltipLabel}
                        >
                          <ActionButton
                            cfg={cityu}
                            colorHex="#BB3568"
                            ariaLabel={`${cityu.label} (PDF)`}
                          />
                        </DualTooltip>
                      )}

                      {/* Columbia button (#62A8E5) */}
                      {columbia.show && (
                        <DualTooltip
                          topEnabled={columbia.topTooltipEnabled}
                          topLabel={columbia.topTooltipLabel}
                          bottomEnabled={columbia.bottomTooltipEnabled}
                          bottomLabel={columbia.bottomTooltipLabel}
                        >
                          <ActionButton
                            cfg={columbia}
                            colorHex="#62A8E5"
                            ariaLabel={`${columbia.label} (PDF)`}
                          />
                        </DualTooltip>
                      )}
                    </div>
                  </div>

                  <p
                    className="text-white text-lg leading-relaxed"
                    style={{ fontFamily: currentContent.bodyFont }}
                  >
                    {currentContent.paragraph1}
                  </p>

                  <p
                    className="text-white text-lg leading-relaxed"
                    style={{ fontFamily: currentContent.bodyFont }}
                  >
                    {currentContent.paragraph2}
                  </p>
                </div>
              </div>

              {/* Right column - Images that scroll through the viewport */}
              <div className="col-span-1 relative h-full overflow-hidden">
                {Array.from({ length: imageCount }, (_, i) => i + 1).map((num, index) => {
                  // Start at top-of-list: image 1 visible first.
                  const currentBottom =
                    (-index * IMAGE_SPACING_VH) + (scrollProgress * scrollDistance);

                  const isVisible = currentBottom > -80 && currentBottom < 120;

                  return (
                    <div
                      key={num}
                      className="absolute w-full px-4"
                      style={{
                        bottom: `${currentBottom}vh`,
                        opacity: isVisible ? 1 : 0,
                        transition: 'opacity 0.2s ease-out',
                      }}
                    >
                      <img
                        src={getImagePath(num)}
                        alt={`AdmissionPedia 2025 resource ${num}`}
                        className="w-full h-auto object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Action button that handles enabled/disabled styles and click ---- */
function ActionButton({
  cfg,
  colorHex,
  ariaLabel,
}: {
  cfg: ButtonCfg;
  colorHex: string;
  ariaLabel: string;
}) {
  const enabled = cfg.enabled;
  const bgStyle = { backgroundColor: enabled ? colorHex : '#6B7280' }; // Tailwind gray-500
  const common =
    'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 transition-colors';
  const state = enabled
    ? 'hover:brightness-110 hover:border-white/20'
    : 'cursor-not-allowed opacity-80';
  const className = `${common} ${state}`;

  // Prevent navigation when disabled, and remove from tab order
  const onClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (!enabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <a
      href={cfg.href}
      download={enabled || undefined}
      aria-disabled={!enabled}
      tabIndex={enabled ? 0 : -1}
      onClick={onClick}
      className={className}
      style={bgStyle}
      aria-label={ariaLabel}
      rel="noopener noreferrer"
    >
      <DownloadIcon />
      <span className="whitespace-nowrap">{cfg.label}</span>
    </a>
  );
}

/* ---- tiny download icon (inline SVG) ---- */
function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="currentColor"
    >
      <path d="M12 3a1 1 0 011 1v8.586l2.293-2.293a1 1 0 111.414 1.414l-4.001 4a1 1 0 01-1.414 0l-4.001-4a1 1 0 111.414-1.414L11 12.586V4a1 1 0 011-1zm-7 14a1 1 0 100 2h14a1 1 0 100-2H5z" />
    </svg>
  );
}

/* ---- tooltip wrapper that can show top and/or bottom tooltips ---- */
function DualTooltip({
  topEnabled,
  topLabel,
  bottomEnabled,
  bottomLabel,
  children,
}: {
  topEnabled: boolean;
  topLabel?: string;
  bottomEnabled: boolean;
  bottomLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative inline-block group">
      {children}

      {/* Top tooltip */}
      <div
        role="tooltip"
        className={[
          'pointer-events-none absolute left-1/2 bottom-full -translate-x-1/2 mb-2',
          'rounded-md bg-black/80 px-2 py-1 text-xs text-white shadow-md whitespace-nowrap',
          'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150',
          topEnabled ? '' : 'hidden',
          'z-20',
        ].join(' ')}
      >
        {topLabel}
        <div
          className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 rotate-45 bg-black/80"
          aria-hidden="true"
        />
      </div>

      {/* Bottom tooltip */}
      <div
        role="tooltip"
        className={[
          'pointer-events-none absolute left-1/2 top-full -translate-x-1/2 mt-2',
          'rounded-md bg-black/80 px-2 py-1 text-xs text-white shadow-md whitespace-nowrap',
          'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150',
          bottomEnabled ? '' : 'hidden',
          'z-20',
        ].join(' ')}
      >
        {bottomLabel}
        <div
          className="absolute left-1/2 bottom-full h-2 w-2 -translate-x-1/2 rotate-45 bg-black/80"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
