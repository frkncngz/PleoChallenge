import i18n from 'i18n-js';
import * as Localization from 'react-native-localize';

import en from './en';
import tr from './tr';

i18n.fallbacks = true;
i18n.translations = {
  en,
  tr,
};

i18n.locale = Localization.locale;

export default i18n;
