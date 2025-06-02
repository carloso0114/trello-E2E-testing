class ListComponent {

  get addNewListButton() {
    return $('[data-testid="list-composer-button"]');
  }

  get addListButtonFinalStep() {
    return $('[data-testid="list-composer-add-list-button"]');
  }

  get listNameInput() {
    return $('[data-testid="list-name-textarea"][placeholder="Enter list name…"]');
  }

  get listWrappers() {
    return $$('[data-testid="list-wrapper"]');
  }

  async addCardToList(listName, cardText) {
    await browser.pause(2000)
    const listWrappers = await $$('[data-testid="list-wrapper"]');
  
    for (const wrapper of listWrappers) {
      const list = await wrapper.$('[data-testid="list"]');
      const titleEl = await list.$('[data-testid="list-name"]');
      const title = await titleEl.getText();
  
      if (title.trim() === listName) {
        const addCardButton = await wrapper.$('[data-testid="list-add-card-button"]');
        await browser.execute(el => el.scrollIntoView(), addCardButton);
        await addCardButton.waitForClickable();
        await addCardButton.click();
  
        const input = await wrapper.$('[data-testid="list-card-composer-textarea"]');
        await input.waitForDisplayed();
        await input.click();
        await input.setValue(cardText);
  
        const submitButton = await wrapper.$('[data-testid="list-card-composer-add-card-button"]');
        await submitButton.waitForClickable();
        await submitButton.click();
  
        return;
      }
    }
  
    throw new Error(`List "${listName}" not found`);
  }

  async findCardInList(listName, cardText) {
    const listWrappers = await $$('[data-testid="list-wrapper"]');
  
    for (const wrapper of listWrappers) {
      const list = await wrapper.$('[data-testid="list"]');
      const titleEl = await list.$('[data-testid="list-name"]');
      const title = await titleEl.getText();
  
      if (title.trim() === listName) {
        return await wrapper.$(`//a[contains(text(), "${cardText}")]`);
      }
    }
  
    throw new Error(`Card "${cardText}" not found in list "${listName}"`);
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

  async findListByTitle(targetTitle) {
    const boardCanvas = await $('[data-testid="board-canvas"]');
    const listElements = await boardCanvas.$$('[data-testid="list"]');
    for (const list of listElements) {
      const titleElement = await list.$('[data-testid="list-name"]');
      const titleText = await titleElement.getText();
      if (titleText.trim() === targetTitle) {
        return list; 
      }
    }
  }

  async getFilterMatchText(listName) {
    const listWrappers = await $$('[data-testid="list-wrapper"]');
  
    for (const wrapper of listWrappers) {
      const list = await wrapper.$('[data-testid="list"]');
      const titleEl = await list.$('[data-testid="list-name"]');
      const title = await titleEl.getText();
  
      if (title.trim() === listName) {
        const filterTextEl = await wrapper.$('p');
        return await filterTextEl.getText();
      }
    }
  
    throw new Error(`List "${listName}" not found`);
  }
}

module.exports = ListComponent;