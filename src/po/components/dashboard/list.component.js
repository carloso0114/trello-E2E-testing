class ListComponent {
  get listNameInput() {
    return $('[data-testid="list-name-textarea"]');
  }

  get addListButton() {
    return $('[data-testid="list-composer-add-list-button"]');
  }

  async add(name) {
    await this.listNameInput.waitForDisplayed();
    await this.listNameInput.setValue(name);
    await this.addListButton.waitForClickable();
    await this.addListButton.click();
  }

  async listExists(name) {
    const listTitles = await $$('[data-testid="lists"] [data-testid="list-name"]');
    const texts = [];
    for (const el of listTitles) {
      const text = await el.getText();
      texts.push(text);
    }
    return texts.includes(name);
  }

  get allLists() {
    return $$('[data-testid="list"]');
  }

  addCardButton(listElement) {
    return listElement.$('[data-testid="list-add-card-button"]');
  }

  get cardTextArea() {
    return $('textarea[data-testid="list-card-composer-textarea"]');
  }

  get confirmAddCardButton() {
    return $('[data-testid="list-card-composer-add-card-button"]');
  }

  async locateList(listName) {
    const lists = await this.allLists;
    for (const list of lists) {
      const titleElement = await list.$('[data-testid="list-name"]');
      const titleText = await titleElement.getText();
      if (titleText.trim() === listName) {
        return list;
      }
    }
    throw new Error(`List with name "${listName}" not found`);
  }

  async addCard(listName, cardTitle) {
    const list = await this.locateList(listName);
    const addCardButton = await this.addCardButton(list);
    await addCardButton.waitForClickable();
    await addCardButton.click();

    const input = this.cardTextArea;
    await input.waitForDisplayed();
    await input.setValue(cardTitle);

    const confirmButton = this.confirmAddCardButton;
    await confirmButton.waitForClickable();
    await confirmButton.click();
  }

  async cardExists(listName, cardTitle) {
    const list = await this.locateList(listName);
    const cards = await list.$$('[data-testid="card-name"]');
  
    for (const card of cards) {
      const text = await card.getText();
      if (text.trim() === cardTitle) {
        return true;
      }
    }
  
    return false;
  }

  async getFilterMatchText(listName) {
    const list = await this.locateList(listName);
    const matchParagraph = await list.$('p*=card matches filters');
    await matchParagraph.waitForDisplayed({ timeout: 5000 });
    return await matchParagraph.getText();
  }
}

module.exports = ListComponent;