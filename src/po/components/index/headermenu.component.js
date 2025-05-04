class HeaderMenuComponent {
  get rootEl(){
    return $('[data-testid="bignav"]')
  }

  item(param) {
    const selectors = {
      login: 'a=Log in',
    };
    return this.rootEl.$(`${selectors[param.toLowerCase()]}`)
  }

  get loginLink() {
    return $('a[href*="id.atlassian.com/login"][href*="application=trello"]');
  }
}

module.exports = HeaderMenuComponent