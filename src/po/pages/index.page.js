const HeaderMenuComponent = require('../components/index/headermenu.component')

class IndexPage {

  constructor() {
    this.headermenu = new HeaderMenuComponent()
  }
  async open() {
    await browser.url('/')
  }
}

module.exports = IndexPage