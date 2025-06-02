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

  get boardMenuButton() {
    return $('button[aria-label="Show menu"]');
  }

  get closeBoardButton() {
    return $('div=Close board');
  }

  get confirmCloseBoardButton() {
    return $('[data-testid="popover-close-board-confirm"]');
  }

  async filterByKeyword(keyword) {
    const input = this.filterKeywordInput;
    await input.setValue(keyword);
  }
}

module.exports = BoardHeaderComponent;