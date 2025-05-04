class ProfileFormComponent {
  get form() {
    return $('[data-testid="profile-form"]');
  }

  get usernameInput() {
    return this.form.$('input[name="username"]');
  }

  get bioTextarea() {
    return this.form.$('textarea#bio');
  }

  get saveButton() {
    return this.form.$('button[type="submit"]');
  }

  get successAlert() {
    return $('[role="alert"]');
  }

  async setUsername(username) {
    await this.usernameInput.waitForDisplayed();
    await this.usernameInput.setValue(username);
  }

  async setBio(bio) {
    await this.bioTextarea.waitForDisplayed();
    await this.bioTextarea.setValue(bio);
  }

  async save() {
    await this.saveButton.waitForDisplayed();
    await this.saveButton.click();
  }
}

module.exports = ProfileFormComponent;