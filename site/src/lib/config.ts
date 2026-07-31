import buildConfig from "../../public/config.build.json";

export interface SiteConfig {
  title: string;
  yesButtonText: string;
  noButtonText: string;
  successTitle: string;
  successSubtitle: string;
  maxAttempts: number;
  theme: string;
  fontSizes: {
    title: string;
    button: string;
    subtitle: string;
    themeBox: string;
  };
  particles: {
    count: number;
    heartScale: number;
    duration: number;
    velocity: number;
    effect: number;
    size: number;
    colors: Record<string, string[]>;
  };
}

export const BUILD_CONFIG: SiteConfig = buildConfig as SiteConfig;
