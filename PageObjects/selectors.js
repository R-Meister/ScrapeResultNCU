export const SELECTORS = {
  login: {
    emailInput: '//*[@id="email"]',
    passwordInput: '//*[@id="password"]',
    loginButton: '//*[@type="submit"]'
  },

  navigation: {
    myLinks: '//*[normalize-space(text())="My Links"]',
    examination: '//*[normalize-space(text())="Examination"]',
    result: '//*[normalize-space(text())="Results"]',
    academic: '//*[normalize-space(text())="Academic"]',
    semester: '//*[normalize-space(text())="Semester Registration"]'
  },

  secret: {
  downloadDgsLink: '//a[normalize-space(text())="Download DGS"]'
  },

  semreg: {
    backlogPresent: `//*[normalize-space(text())="Backlog Courses']`,
    submit: '//*[normalize-space(text())="Submit"]',
  }

};
