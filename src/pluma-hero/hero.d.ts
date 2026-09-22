export type HeroLanguage = 'en' | 'es';
export interface HeroVideo { id: string; desktop: string; mobile: string; poster: string; mobilePoster?: string }
export interface HeroTiming { hold: number; contract: number; reveal: number; brandOffset: number; edgeOffset: number }
export interface HeroLabels {
  eyebrow: string;
  navHome: string;
  about: string;
  prices: string;
  vouchers: string;
  book: string;
  menu: string;
  close: string;
  navigation: string;
  home: string;
  pause: string;
  play: string;
  photoAlt: string;
  language: string;
}
export interface HeroAssets { wordmark: string; logo: string; feather: string; navFeather: string; menuIcon: string; photoMask: string; massage: string; massageMedium: string; massageSmall: string }
export type HeroSequenceName = 'feather' | 'photo' | 'eyebrow' | 'wordmark' | 'edge' | 'navigation';
export interface HeroSequence { start: number; duration: number; easing: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'smooth' | 'gentle'; distance?: number; depth?: number }
export interface HeroOptions {
  sequences?: Partial<Record<HeroSequenceName, Partial<HeroSequence>>>;
  assetBase?: string;
  videos?: HeroVideo[];
  assets?: Partial<HeroAssets>;
  timing?: Partial<HeroTiming>;
  readinessDeadlineMs?: number;
  language?: HeroLanguage;
  labels?: Partial<Record<HeroLanguage, Partial<HeroLabels>>>;
  links?: Partial<{ home: string; about: string; prices: string; vouchers: string; booking: string }>;
  onLanguageChange?: (language: HeroLanguage) => void;
  renderNavigation?: boolean;
  navigationElement?: HTMLElement;
}
export interface HeroController {
  seek(time: number): void;
  playFrom(time?: number, rate?: number): void;
  getState(): {
    time: number;
    duration: number;
    playing: boolean;
    editing: boolean;
    phase: string;
    scene: string | null;
    usedVideo: boolean;
    videoReady: boolean;
  };
  getSequences(): Record<HeroSequenceName, HeroSequence>;
  setSequences(updates: Partial<Record<HeroSequenceName, Partial<HeroSequence>>>): void;
  resetSequences(): void;
  finish(): void;
  replay(): void;
  destroy(): void;
  setLanguage(language: HeroLanguage, notify?: boolean): void;
  pauseMotion(): void;
  resumeMotion(): void;
}
export const defaults: HeroOptions;
export const translations: Record<HeroLanguage, HeroLabels>;
export function heroMarkup(options?: HeroOptions): string;
export function initPlumaHero(root: HTMLElement, options?: HeroOptions): HeroController;
