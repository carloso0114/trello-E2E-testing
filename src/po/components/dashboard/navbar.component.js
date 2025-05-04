class NavBarComponent {
  get userMenuButton() {
    return $('[data-testid="header-member-menu-button"]');
  }

  get profileLink() {
    return $('[data-testid="account-menu-profile"]');
  }

  get logoHomeLink() {
    return $('a[aria-label="Back to home"]');
  }
  
  get plusMenuButton() {
    return $('[data-testid="header-create-menu-button"]');
  }

  get createBoardButton() {
    return $('[data-testid="header-create-board-button"]');
  }

  get boardTitleInput() {
    return $('[data-testid="create-board-title-input"]');
  }
  
  get createBoardSubmitButton() {
    return $('[data-testid="create-board-submit-button"]');
  }

  async goToProfileSettings() {
    await this.userMenuButton.waitForDisplayed();
    await this.userMenuButton.click();
    await this.profileLink.waitForDisplayed();
    await this.profileLink.click();
  }

  async createBoard(boardTitle) {
    await this.boardTitleInput.waitForDisplayed();
    await this.boardTitleInput.setValue(boardTitle);
    await this.createBoardSubmitButton.waitForClickable();
    await this.createBoardSubmitButton.click();
  }
}

module.exports = NavBarComponent