jest.mock('react-native-localization', () => {
  return class LocalizedStrings {
    static Value() {
      return jest.fn(() => {});
    }
    setLanguage = () => jest.fn();
  };
});

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.NativeModules.SettingsManager = {
    settings: {
      AppleLanguages: [],
    },
  };
  RN.NativeModules.NotifeeApiModule = {
    addListener: jest.fn(),
    eventsAddListener: jest.fn(),
    eventsNotifyReady: jest.fn(),
  };
  return RN;
});

jest.mock('react-native-snackbar', () => {
    return {
        Snackbar: jest.fn()
    }
});



jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
      ...actualNav,
      useNavigation: () => ({
        navigate: jest.fn(),
      }),
    };
  });
