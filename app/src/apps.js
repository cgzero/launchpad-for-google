/**
 * @file App data definitions
 *
 * - en: https://support.google.com?hl=en
 * - zh_CN: https://support.google.com?hl=zh-Hans
 * - zh_TW: https://support.google.com?hl=zh-TW
 * - ja: https://support.google.com?hl=ja
 * - es: https://support.google.com?hl=es
 * - pt_BR: https://support.google.com/?hl=pt-BR
 * - ko: https://support.google.com/?hl=ko
 * - de: https://support.google.com/?hl=de
 * - fr: https://support.google.com/?hl=fr
 */

export const CORE_APPS = [
    {
        id: 'account',
        text: 'Account',
        href: 'https://myaccount.google.com',
        position: 4,
    },
    {
        id: 'search',
        text: 'Search',
        href: 'https://www.google.com',
        position: 23,
    },
    {
        id: 'maps',
        text: 'Maps',
        href: 'https://maps.google.com',
        position: 31,
    },
    {
        id: 'youtube',
        text: 'YouTube',
        href: 'https://www.youtube.com',
        position: 41,
    },
    {
        id: 'news',
        text: 'News',
        href: 'https://news.google.com',
        position: 11,
    },
    {
        id: 'gmail',
        text: 'Gmail',
        href: 'https://mail.google.com/mail/',
        position: 28,
    },
    {
        id: 'meet',
        text: 'Meet',
        href: 'https://meet.google.com',
        position: 44,
    },
    {
        id: 'chat',
        text: 'Chat',
        href: 'https://chat.google.com',
        position: 49,
    },
    {
        id: 'contacts',
        text: 'Contacts',
        href: 'https://contacts.google.com',
        position: 1,
    },
];

export const EXTRA_APPS = [
    {
        id: 'drive',
        text: 'Drive',
        href: 'https://drive.google.com',
        position: 6,
    },
    {
        id: 'calendar',
        text: 'Calendar',
        href: 'https://calendar.google.com/calendar',
        position: 27,
    },
    {
        id: 'play',
        text: 'Play',
        href: 'https://play.google.com',
        position: 43,
    },
    {
        id: 'translate',
        text: 'Translate',
        href: 'https://translate.google.com',
        position: 9,
    },
    {
        id: 'photos',
        text: 'Photos',
        href: 'https://photos.google.com',
        position: 10,
    },
    {
        id: 'chrome',
        text: 'Chrome',
        href: 'https://www.google.com/chrome',
        position: 42,
    },
    {
        id: 'shopping',
        text: 'Shopping',
        href: 'https://www.google.com/shopping',
        position: 18,
    },
    {
        id: 'finance',
        text: 'Finance',
        href: 'https://www.google.com/finance',
        position: 19,
    },
    {
        id: 'docs',
        text: 'Docs',
        href: 'https://docs.google.com/document',
        position: 15,
    },
    {
        id: 'sheets',
        text: 'Sheets',
        href: 'https://docs.google.com/spreadsheets',
        position: 13,
    },
    {
        id: 'slides',
        text: 'Slides',
        href: 'https://docs.google.com/presentation',
        position: 14,
    },
    {
        id: 'books',
        text: 'Books',
        href: 'https://books.google.com',
        position: 3,
    },
    {
        id: 'blogger',
        text: 'Blogger',
        href: 'https://www.blogger.com',
        position: 12,
    },
    {
        id: 'keep',
        text: 'Keep',
        href: 'https://keep.google.com',
        position: 46,
    },
    {
        id: 'earth',
        text: 'Earth',
        href: 'https://earth.google.com/web/',
        position: 32,
    },
    {
        id: 'saved',
        text: 'Saved',
        href: 'https://www.google.com/save',
        position: 35,
    },
    {
        id: 'artsAndCulture',
        text: 'Arts & Culture',
        href: 'https://artsandculture.google.com',
        position: 26,
    },
    {
        id: 'googleAds',
        text: 'Ads',
        href: 'https://ads.google.com/ups/routing',
        position: 36,
    },
    {
        id: 'merchantCenter',
        text: 'Merchant Center',
        href: 'https://merchants.google.com',
        position: 21,
    },
    {
        id: 'travel',
        text: 'Travel',
        href: 'https://www.google.com/travel',
        position: 20,
    },
    {
        id: 'forms',
        text: 'Forms',
        href: 'https://docs.google.com/forms',
        position: 38,
    },
    {
        id: 'store',
        text: 'Store',
        href: 'https://store.google.com',
        position: 5,
    },
    {
        id: 'chromeWebStore',
        text: 'Chrome Web Store',
        href: 'https://chrome.google.com/webstore',
        position: 0,
    },
    {
        id: 'googleFiWireless',
        text: 'Fi Wireless',
        href: 'https://fi.google.com',
        position: 8,
    },
    {
        id: 'analytics',
        text: 'Analytics',
        href: 'https://analytics.google.com/analytics/web',
        position: 16,
    },
    {
        id: 'youtubeMusic',
        text: 'YouTube Music',
        href: 'https://music.youtube.com',
        position: 52,
    },
    {
        id: 'notebookLM',
        text: 'Notebook',
        href: 'https://notebooklm.google.com',
        position: 37,
    },
    {
        id: 'voice',
        text: 'Voice',
        href: 'https://voice.google.com',
        position: 7,
    },
    {
        id: 'classroom',
        text: 'Classroom',
        href: 'https://classroom.google.com',
        position: 48,
    },
    {
        id: 'tasks',
        text: 'Tasks',
        href: 'https://tasks.google.com',
        position: 17,
    },
    {
        id: 'vault',
        text: 'Vault',
        href: 'https://vault.google.com',
        position: 24,
    },
    {
        id: 'passwordManager',
        text: 'Password Manager',
        href: 'https://passwords.google.com',
        position: 51,
    },
    {
        id: 'googleOne',
        text: 'One',
        href: 'https://one.google.com',
        position: 34,
    },
    {
        id: 'cloudSearch',
        text: 'Cloud Search',
        href: 'https://cloudsearch.google.com/',
        position: 50,
    },
    {
        id: 'googleAdmin',
        text: 'Admin',
        href: 'https://admin.google.com/ac/home',
        position: 22,
    },
    {
        id: 'wallet',
        text: 'Wallet',
        href: 'https://wallet.google.com/wallet/home',
        position: 33,
    },
    {
        id: 'gemini',
        text: 'Gemini',
        href: 'https://gemini.google.com',
        position: 40,
    },
    {
        id: 'myAdCenter',
        text: 'My Ad Center',
        href: 'https://myadcenter.google.com',
        position: 45,
    },
    {
        id: 'sites',
        text: 'Sites',
        href: 'https://sites.google.com',
        position: 30,
    },
    {
        id: 'businessProfile',
        text: 'Business Profile',
        href: 'https://business.google.com',
        position: 25,
    },
    {
        id: 'vids',
        text: 'Vids',
        href: 'https://docs.google.com/videos',
        position: 2,
    },
];
