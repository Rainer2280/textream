import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Wallet, Play, Gift, User, TrendingUp, Euro, Clock, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import LanguageSelector from "@/components/LanguageSelector";
import { unityAdsService } from "@/services/unityAds";

const Index = () => {
  const { t } = useLanguage();
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [auraPoints, setAuraPoints] = useState(12450);
  const [totalEarned, setTotalEarned] = useState(24.30);
  const exchangeRate = 1000; // 1000 AP = 1 EUR
  const euroEquivalent = auraPoints / exchangeRate;

  // Initialize Unity Ads and handle auth redirect
  useEffect(() => {
    const initializeAds = async () => {
      await unityAdsService.initialize();
      if (unityAdsService.isAvailable()) {
        await unityAdsService.showLoadingAd();
      }
    };

    if (loading) {
      initializeAds();
    }

    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const availableAds = [
    { id: 1, brand: "Nokia", duration: 30, reward: 45, category: t('technology') },
    { id: 2, brand: "Fazer", duration: 15, reward: 25, category: t('foodDrink') },
    { id: 3, brand: "Marimekko", duration: 45, reward: 65, category: t('fashion') },
    { id: 4, brand: "Supercell", duration: 20, reward: 35, category: t('gaming') },
  ];

  const handleAdClick = async (ad: typeof availableAds[0]) => {
    if (ad.brand === "Nokia") {
      const success = await unityAdsService.showRewardedAd();
      if (success) {
        // Reward the user with aura points
        setAuraPoints(prev => prev + ad.reward);
        setTotalEarned(prev => prev + (ad.reward / 1000));
      }
    }
  };

  const recentEarnings = [
    { brand: "K-Market", points: 40, time: `2 ${t('hoursAgo')}` },
    { brand: "Spotify", points: 50, time: `5 ${t('hoursAgo')}` },
    { brand: "Uber", points: 35, time: `1 ${t('dayAgo')}` },
    ];

  // Show loading state with Unity Ad integration
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
          <div className="text-white text-xl">Loading...</div>
          {unityAdsService.isAvailable() && (
            <div className="text-purple-200 text-sm">Loading ad content...</div>
          )}
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header - Fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-white">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              {t('appName')}
            </h1>
            <p className="text-sm text-purple-200">{t('tagline')}</p>
          </div>
          <div className="flex items-center space-x-2">
            <LanguageSelector />
            <Button 
              variant="ghost" 
              size="icon"
              onClick={signOut}
              className="text-white hover:bg-white/10"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 pb-20 pt-24">
        {/* Balance Card */}
        <Card className="mt-6 bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              <span>{t('yourBalance')}</span>
              <Wallet className="w-5 h-5" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                {auraPoints.toLocaleString()} AP
              </div>
              <div className="text-2xl font-semibold text-purple-200 flex items-center justify-center">
                <Euro className="w-5 h-5 mr-1" />
                {euroEquivalent.toFixed(2)}
              </div>
              <div className="text-sm text-purple-300">
                1,000 AP = €1.00
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-purple-200">{t('progressToCashout')}</span>
                <span className="text-white">{Math.min(100, (auraPoints / 10000) * 100).toFixed(0)}%</span>
              </div>
              <Progress value={Math.min(100, (auraPoints / 10000) * 100)} className="h-2" />
              <p className="text-xs text-purple-300 text-center">
                {t('minimumCashout')}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Cash Out Section - Now More Visible */}
        <Card className="mt-6 bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <CardContent className="p-6 text-center">
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Euro className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-green-200 to-emerald-200 bg-clip-text text-transparent">
              {t('readyToCashOut')}
            </h3>
            <div className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 border-2 border-white/30 shadow-lg">
              <p className="text-2xl font-bold text-white mb-3 leading-tight">
                Exchange your AuraPoints for real Euros
              </p>
              <p className="text-xl text-green-100 font-semibold bg-gradient-to-r from-green-200 to-emerald-200 bg-clip-text text-transparent">
                via SEPA transfer or PayPal
              </p>
            </div>
            <Button 
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-xl h-14 shadow-xl transform transition-all duration-200 hover:scale-105"
              disabled={auraPoints < 10000}
            >
              {t('cashOut')} €{euroEquivalent.toFixed(2)}
            </Button>
            {auraPoints < 10000 && (
              <p className="text-sm text-green-200 mt-4 bg-white/10 rounded-lg p-3 border border-white/20">
                {t('needMoreAp')} {(10000 - auraPoints).toLocaleString()} AP {t('moreNeeded')}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Watch & Earn CTA */}
        <div className="mt-6">
          <Button 
            className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg transform transition-all duration-200 hover:scale-105"
          >
            <Play className="w-6 h-6 mr-3" />
            {t('watchAndEarn')}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white text-center p-4">
            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-400" />
            <div className="text-lg font-bold">€{totalEarned}</div>
            <div className="text-xs text-purple-200">{t('totalEarned')}</div>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white text-center p-4">
            <Clock className="w-6 h-6 mx-auto mb-2 text-blue-400" />
            <div className="text-lg font-bold">47</div>
            <div className="text-xs text-purple-200">{t('adsWatched')}</div>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white text-center p-4">
            <Gift className="w-6 h-6 mx-auto mb-2 text-purple-400" />
            <div className="text-lg font-bold">3</div>
            <div className="text-xs text-purple-200">{t('streakDays')}</div>
          </Card>
        </div>

        {/* Available Ads */}
        <Card className="mt-6 bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">{t('availableAds')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {availableAds.map((ad) => (
              <div 
                key={ad.id} 
                className={`flex items-center justify-between p-3 bg-white/10 rounded-lg border border-white/10 ${
                  ad.brand === "Nokia" ? "cursor-pointer hover:bg-white/20 transition-colors" : ""
                }`}
                onClick={() => handleAdClick(ad)}
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-white">{ad.brand}</h3>
                    <Badge variant="secondary" className="text-xs bg-purple-500/20 text-purple-200 border-purple-400/30">
                      {ad.category}
                    </Badge>
                    {ad.brand === "Nokia" && (
                      <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-200 border-green-400/30">
                        {t('clickToWatch') || 'Click to Watch'}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-purple-200 mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    {ad.duration}s
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-white">+{ad.reward} AP</div>
                  <div className="text-xs text-purple-300">€{(ad.reward / 1000).toFixed(3)}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="mt-6 bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">{t('recentEarnings')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentEarnings.map((earning, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">{earning.brand}</div>
                  <div className="text-sm text-purple-300">{earning.time}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-400">+{earning.points} AP</div>
                  <div className="text-xs text-purple-300">€{(earning.points / 1000).toFixed(3)}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm border-t border-white/20">
        <div className="max-w-md mx-auto px-6 py-3">
          <div className="flex justify-around">
            <Button variant="ghost" className="flex flex-col items-center text-white">
              <Play className="w-5 h-5 mb-1" />
              <span className="text-xs">{t('watch')}</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center text-purple-300">
              <Wallet className="w-5 h-5 mb-1" />
              <span className="text-xs">{t('wallet')}</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center text-purple-300">
              <Gift className="w-5 h-5 mb-1" />
              <span className="text-xs">{t('rewards')}</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center text-purple-300">
              <User className="w-5 h-5 mb-1" />
              <span className="text-xs">{t('profile')}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
