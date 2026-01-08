export const SELECTORS = {
  login: {
    emailInput: '//*[@id="email"]',
    passwordInput: '//*[@id="password"]',
    loginButton: '//*[@type="submit"]'
  },

  navigation: {
    myLinks: '//*[normalize-space(text())="My Links"]',
    examination: '//*[normalize-space(text())="Examination"]',
    result: '//*[normalize-space(text())="Results"]'
  },

  secret: {
  downloadDgsLink: '//a[normalize-space(text())="Download DGS"]'
  }
};
