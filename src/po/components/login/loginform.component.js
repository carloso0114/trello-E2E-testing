class LoginFormComponent {
  get emailField() {
    return $('input[name="username"]')
  }

  get continueButton() {
    return $('#login-submit');
  }

  get passwordField() {
    return $('#password');
  }

  async loginWithEmail(email, password) {
    await this.emailField.waitForDisplayed();
    await this.emailField.setValue(email);

    await this.continueButton.waitForDisplayed();
    await this.continueButton.click();

    await this.passwordField.waitForDisplayed();
    await this.passwordField.setValue(password);

    await this.continueButton.waitForDisplayed();
    await this.continueButton.click();
  }
}

module.exports = LoginFormComponent;