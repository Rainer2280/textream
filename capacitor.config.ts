import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.0abaebfbb7ec4800ae75e1f5d1025df6',
  appName: 'aura-cash-flow-app',
  webDir: 'dist',
  server: {
    url: "https://0abaebfb-b7ec-4800-ae75-e1f5d1025df6.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#3b0764",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    UnityAds: {
      gameId: "5902743",
      testMode: true
    },
  },
};

export default config;