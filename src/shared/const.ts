export const CALENDAR_TYPES = {
  GREGORY: 'gregory',
  HEBREW: 'hebrew',
  ISLAMIC: 'islamic',
  COPTIC: 'coptic',
  ISO_8601: 'iso8601',
} as const;

export const DEPRECATED_CALENDAR_TYPES = {
  ARABIC: 'Arabic',
  HEBREW: 'Hebrew',
  ISO_8601: 'ISO 8601',
  US: 'US',
} as const;

export const CALENDAR_TYPE_LOCALES = {
  [CALENDAR_TYPES.GREGORY]: [
    'en-CA',
    'en-US',
    'es-AR',
    'es-BO',
    'es-CL',
    'es-CO',
    'es-CR',
    'es-DO',
    'es-EC',
    'es-GT',
    'es-HN',
    'es-MX',
    'es-NI',
    'es-PA',
    'es-PE',
    'es-PR',
    'es-SV',
    'es-VE',
    'pt-BR',
  ],
  [CALENDAR_TYPES.HEBREW]: ['he', 'he-IL'],
  [CALENDAR_TYPES.ISLAMIC]: [
    // ar-LB, ar-MA intentionally missing
    'ar',
    'ar-AE',
    'ar-BH',
    'ar-DZ',
    'ar-EG',
    'ar-IQ',
    'ar-JO',
    'ar-KW',
    'ar-LY',
    'ar-OM',
    'ar-QA',
    'ar-SA',
    'ar-SD',
    'ar-SY',
    'ar-YE',
    'dv',
    'dv-MV',
    'ps',
    'ps-AR',
  ],
  [CALENDAR_TYPES.COPTIC]: ['en', 'ar-u-nu-arab'],
};

export const WEEKDAYS = [0, 1, 2, 3, 4, 5, 6] as const;
