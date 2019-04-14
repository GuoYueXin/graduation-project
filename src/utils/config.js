module.exports = {
  siteName: 'AntD Admin',
  copyright: 'Ant Design Admin  © 2018 zuiidea',
  logoPath: '/logo.svg',
  apiPrefix: '',
  fixedHeader: true, // sticky primary layout header

  /* Layout configuration, specify which layout to use for route. */
  layouts: [
    {
      name: 'primary',
      include: [/.*/],
      exlude: [/(\/(en|zh))*\/login/],
    },
  ],

  /* I18n configuration, `languages` and `defaultLanguage` are required currently. */
  i18n: {
    /* Countrys flags: https://www.flaticon.com/packs/countrys-flags */
    languages: [
      {
        key: 'pt-br',
        title: 'Português',
        flag: '/brazil.svg',
      },
      {
        key: 'en',
        title: 'English',
        flag: '/america.svg',
      },
      {
        key: 'zh',
        title: '中文',
        flag: '/china.svg',
      },
    ],
    defaultLanguage: 'en',
  },
  menu: [
    {
      id: '1',
      icon: 'laptop',
      name: 'Dashboard',
      zhName: '仪表盘',
      route: '/dashboard',
    },
    {
      id: '2',
      menuParentId: '-1',
      icon: 'user-add',
      name: '注册',
      zhName: '注册',
      route: '/register',
    },
    {
      id: '3',
      menuParentId: '-1',
      icon: 'undo',
      name: '找回密码',
      zhName: '找回密码',
      route: '/resetPwd',
    },
    {
      id: '4',
      menuParentId: '-1',
      icon: 'undo',
      name: '首页',
      zhName: '首页',
      route: '/home',
    },
  ],
  visit: ['1', '2', '3', '4'],
  showSilderList: ['dashboard'],
}
