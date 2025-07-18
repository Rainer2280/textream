import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    appName: "AuraCash",
    tagline: "Earn real money watching ads",
    yourBalance: "Your Balance",
    progressToCashout: "Progress to Cashout",
    minimumCashout: "Minimum cashout: €10.00 (10,000 AP)",
    readyToCashOut: "Ready to Cash Out!",
    cashOut: "Cash Out",
    needMoreAp: "You need",
    moreNeeded: "more AP to cash out",
    watchAndEarn: "Watch Ads & Earn",
    totalEarned: "Total Earned",
    adsWatched: "Ads Watched",
    streakDays: "Streak Days",
    availableAds: "Available Ads",
    recentEarnings: "Recent Earnings",
    watch: "Watch",
    wallet: "Wallet",
    rewards: "Rewards",
    profile: "Profile",
    technology: "Technology",
    foodDrink: "Food & Drink",
    fashion: "Fashion",
    gaming: "Gaming",
    hoursAgo: "hours ago",
    dayAgo: "day ago",
    signIn: "Sign In",
    signUp: "Sign Up",
    email: "Email",
    password: "Password",
    welcomeBack: "Welcome Back!",
    createAccount: "Create Your Account",
    alreadyHaveAccount: "Already have an account?",
    dontHaveAccount: "Don't have an account?",
    signInToContinue: "Sign in to continue earning",
    joinToStart: "Join AuraCash to start earning real money"
  },
  fi: {
    appName: "AuraCash",
    tagline: "Ansaitse oikeaa rahaa katsomalla mainoksia",
    yourBalance: "Saldosi",
    progressToCashout: "Edistyminen kotiutukseen",
    minimumCashout: "Minimi kotiutus: €10.00 (10,000 AP)",
    readyToCashOut: "Valmis kotiutukseen!",
    cashOut: "Kotiuta",
    needMoreAp: "Tarvitset",
    moreNeeded: "AP lisää kotiutukseen",
    watchAndEarn: "Katso mainoksia & ansaitse",
    totalEarned: "Ansaittu yhteensä",
    adsWatched: "Mainoksia katsottu",
    streakDays: "Päiviä putkeen",
    availableAds: "Saatavilla olevat mainokset",
    recentEarnings: "Viimeaikaiset ansiot",
    watch: "Katso",
    wallet: "Lompakko",
    rewards: "Palkinnot",
    profile: "Profiili",
    technology: "Teknologia",
    foodDrink: "Ruoka & juoma",
    fashion: "Muoti",
    gaming: "Pelit",
    hoursAgo: "tuntia sitten",
    dayAgo: "päivä sitten",
    signIn: "Kirjaudu sisään",
    signUp: "Rekisteröidy",
    email: "Sähköposti",
    password: "Salasana",
    welcomeBack: "Tervetuloa takaisin!",
    createAccount: "Luo tili",
    alreadyHaveAccount: "Onko sinulla jo tili?",
    dontHaveAccount: "Eikö sinulla ole tiliä?",
    signInToContinue: "Kirjaudu sisään jatkaaksesi ansaitsemista",
    joinToStart: "Liity AuraCashiin ansaitaksesi oikeaa rahaa"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>('en');

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};