/**
 * Application Identity (Brand)
 *
 * Also note that the 'Brand' is used in the following places:
 *  - README.md               all over
 *  - package.json            app-slug and version
 *  - [public/manifest.json]  name, short_name, description, theme_color, background_color
 */
export const Brand = {
  Title: {
    Base: 'COM Chat',
    Common: (process.env.NODE_ENV === 'development' ? '[DEV] ' : '') + 'COM Chat',
  },
  Meta: {
    Description: 'Launch COM-Chat to unlock the full potential of AI, with precise control over your data and models. Voice interface, AI personas, advanced features, and fun UX.',
    SiteName: 'COM-Chat | Precision AI for You',
    ThemeColor: '#32383E',
  },
  URIs: {
    Home: 'https://comchat.io',
    CardImage: 'https://comchat.io/icons/card-dark-1200.png',
    OpenRepo: 'https://github.com/smart-window/com-chat',
    OpenProject: 'https://github.com/smart-window',
    SupportInvite: 'https://discord.gg/sWRZPrVhwC',
    PrivacyPolicy: 'https://comchat.io/privacy',
  },
};