import { Capacitor } from '@capacitor/core';

// Unity Ads configuration
const UNITY_GAME_ID = '5902743'; // Unity Game ID
const UNITY_PLACEMENT_ID = 'Interstitial_Android'; // Default placement for interstitial ads
const UNITY_REWARDED_PLACEMENT_ID = 'Rewarded_Android'; // Placement for rewarded ads

interface UnityAdsPlugin {
  initialize: (options: { gameId: string; testMode: boolean }) => Promise<void>;
  showInterstitial: (options: { placementId: string }) => Promise<void>;
  isReady: (options: { placementId: string }) => Promise<{ ready: boolean }>;
}

class UnityAdsService {
  private unityAds: UnityAdsPlugin | null = null;
  private isInitialized = false;
  private isNative = false;

  constructor() {
    this.isNative = Capacitor.isNativePlatform();
    if (this.isNative) {
      this.loadUnityAdsPlugin();
    }
  }

  private async loadUnityAdsPlugin() {
    try {
      // In a real implementation, you would install the Unity Ads plugin
      // For now, we'll create a mock implementation
      this.unityAds = {
        initialize: async (options) => {
          console.log('Mock Unity Ads initialized with:', options);
          return Promise.resolve();
        },
        showInterstitial: async (options) => {
          console.log('Mock Unity Ad shown with placement:', options.placementId);
          // Simulate ad display duration
          await new Promise(resolve => setTimeout(resolve, 2000));
          return Promise.resolve();
        },
        isReady: async (options) => {
          console.log('Mock Unity Ad ready check for:', options.placementId);
          return Promise.resolve({ ready: true });
        }
      };
    } catch (error) {
      console.warn('Unity Ads plugin not available:', error);
    }
  }

  async initialize() {
    if (!Capacitor.isNativePlatform() || !this.unityAds) {
      console.log('Unity Ads not available on web platform');
      return;
    }

    try {
      await this.unityAds.initialize({
        gameId: UNITY_GAME_ID,
        testMode: true // Set to false in production
      });
      this.isInitialized = true;
      console.log('Unity Ads initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Unity Ads:', error);
    }
  }

  async showLoadingAd() {
    if (!this.isInitialized || !this.unityAds) {
      console.log('Unity Ads not initialized');
      return;
    }

    try {
      // Check if ad is ready
      const { ready } = await this.unityAds.isReady({ placementId: UNITY_PLACEMENT_ID });
      
      if (ready) {
        await this.unityAds.showInterstitial({ placementId: UNITY_PLACEMENT_ID });
        console.log('Unity Ad shown successfully');
      } else {
        console.log('Unity Ad not ready');
      }
    } catch (error) {
      console.error('Failed to show Unity Ad:', error);
    }
  }

  async showRewardedAd() {
    if (!this.isInitialized || !this.unityAds) {
      console.log('Unity Ads not initialized');
      return;
    }

    try {
      // Check if rewarded ad is ready
      const { ready } = await this.unityAds.isReady({ placementId: UNITY_REWARDED_PLACEMENT_ID });
      
      if (ready) {
        await this.unityAds.showInterstitial({ placementId: UNITY_REWARDED_PLACEMENT_ID });
        console.log('Unity Rewarded Ad shown successfully');
        return true; // Return true when ad is completed successfully
      } else {
        console.log('Unity Rewarded Ad not ready');
        return false;
      }
    } catch (error) {
      console.error('Failed to show Unity Rewarded Ad:', error);
      return false;
    }
  }

  isAvailable() {
    return Capacitor.isNativePlatform() && this.unityAds !== null;
  }
}

export const unityAdsService = new UnityAdsService();