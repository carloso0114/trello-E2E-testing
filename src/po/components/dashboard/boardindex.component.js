class BoardIndexComponent {
  get yourWorkspacesHeader() {
    return $('//h3[text()="YOUR WORKSPACES"]')
  }

  async findBoard(boardTitle) {
    const element = await $(`//a[@title="${boardTitle}"]`);  
    return element;
  }

}

module.exports = BoardIndexComponent;