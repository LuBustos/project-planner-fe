import { NativeModules, Platform } from 'react-native';
import LocalizedStrings from 'react-native-localization';

let t = new LocalizedStrings({
  da_US: {
    opret_bruger: 'Opret bruger',
    log_ind: 'Log ind',
    brugernavn: 'Brugernavn',
    adgangskode: 'Adgangskode',
    profilbillede: 'Profilbillede',
    fortsæt: 'Fortsæt',
    kamera: 'Kamera',
    upload: 'Upload',
    vælg: 'Vælg',
    mine_opgaver: 'Mine opgaver',
    s_tasks: 'Søg efter opgaver',
    c_task: 'Opret opgave',
    placeholder_input: 'Søg efter opgaver',
    titel: 'Titel',
    beskrivelse: 'Beskrivelse . . . ',
    modtager: 'Modtager(e)',
    tags: 'Tags',
    opret: 'Opret',
    opgave: 'Opgave',
    gennemførte: 'Gennemførte',
    created_by: 'Oprettet af mig',
    omtaler_mig: 'Omtaler mig',
    med_billeder: 'Med billeder',
    gem: 'Gem',
    empty_dashboard_desc: 'Tryk på plusset i hjørnet for at oprette en opgave',
    empty_dashboard_title: 'Kom i gang',
    konto: 'Konto',
    change_profile: 'Skift profilbillede',
    hov: 'Hov!',
    guest_subt: 'Lås op for alle funktioner ved at oprette en bruger',
    c_guest: 'Er du allerede bruger?',
    here: 'her',
    theme: 'Skifte tema', //Should be change theme or sth like that
    tema: 'tema',
    afleveringsdato: 'Afleveringsdato',
    overdue_tasks: 'Du har forfaldne opgaver',
    you_have: 'Du har',
    overdue_to_complete: 'forfaldne opgaver at udføre',
    reminder_saved: 'Påmindelsen blev gemt',
    pass_user_empty: 'Adgangskode eller brugernavn er tomt'
  },
  en_US: {
    opret_bruger: 'Create account',
    log_ind: 'Log in',
    brugernavn: 'Username',
    adgangskode: 'Password',
    profilbillede: 'Profile',
    kamera: 'Camera',
    upload: 'Upload',
    vælg: 'Choose',
    mine_opgaver: 'My Tasks',
    s_tasks: 'Search for tasks',
    c_task: 'Create task',
    titel: 'Title',
    beskrivelse: 'Description . . .',
    modtager: 'to',
    tags: 'Tags',
    opret: 'Create',
    opgave: 'Task',
    gennemførte: 'Completed',
    created_by: 'Created by me',
    omtaler_mig: 'Mentions me',
    med_billeder: 'With images',
    gem: 'Save',
    empty_dashboard_desc: 'Tap the plus sign in the corner to create a task',
    empty_dashboard_title: 'Get started',
    konto: 'Account',
    change_profile: 'Change profile',
    hov: 'Oops!',
    guest_subt: 'Unlock all features by creating a user',
    c_user: 'Are you already a user?',
    here: 'here',
    placeholder_input: 'Search for tasks',
    fortsæt: 'Continue',
    c_guest: 'Are you already a user?',
    theme: 'Change theme',
    tema: 'theme',
    afleveringsdato: 'Due date',
    overdue_tasks: 'You have overdue tasks',
    you_have: 'You have',
    overdue_to_complete:'overdue tasks to complete',
    reminder_saved: 'The reminder was saved',
    pass_user_empty: 'Password or username empty'
  },
});

const deviceLanguage =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
    : NativeModules.I18nManager.localeIdentifier;

t.setLanguage(deviceLanguage);

export default t;
