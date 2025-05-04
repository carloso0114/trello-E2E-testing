class BoardHeaderComponent {
  get boardTitle() {
    return $('[data-testid="board-name-display"]');
  }

  get filterButton() {
    return $('[data-testid="filter-popover-button"]');
  }

  get filterKeywordInput() {
    return $('input[placeholder="Enter a keyword…"]');
  }

  async filterByKeyword(keyword) {
    const input = this.filterKeywordInput;
    await input.setValue(keyword);
  }
}

module.exports = BoardHeaderComponent;