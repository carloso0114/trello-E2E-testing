const { Given, When, Then, Before } = require('@cucumber/cucumber');
const chai = require('chai');
chai.should();

const IndexPage = require('../../src/po/pages/index.page');
const LoginPage = require('../../src/po/pages/login.page');
const DashboardPage = require('../../src/po/pages/dashboard.page');

const indexPage = new IndexPage();
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

Before(async () => {
  // Setup before each scenario
  await browser.setWindowSize(1920, 1080);
});

Given('I open the Trello root page', async () => {
  await indexPage.open();
});

When('I log in with email {string} and password {string}', async (email, password) => {
  const loginButton = await indexPage.headermenu.loginLink;
  await loginButton.click();

  const loginForm = loginPage.form;
  await loginForm.loginWithEmail(email, password);
});

Then('I should see the {string} header', async (expectedHeader) => {
  const yourWorkspacesHeader = dashboardPage.boardIndex.yourWorkspacesHeader;
  await yourWorkspacesHeader.waitForDisplayed();
  const text = await yourWorkspacesHeader.getText();
  text.should.equal(expectedHeader);
});

Given('I am logged in', async () => {
  await indexPage.open();
  const yourWorkspacesHeader = dashboardPage.boardIndex.yourWorkspacesHeader;
  await yourWorkspacesHeader.waitForDisplayed();
  const text = await yourWorkspacesHeader.getText();
  text.should.equal('YOUR WORKSPACES');
});

When('I edit my profile username to {string} and bio to {string}', async (username, bio) => {
  await dashboardPage.navbar.goToProfileSettings();
  await dashboardPage.profileForm.setUsername(username);
  await dashboardPage.profileForm.setBio(bio);
  await dashboardPage.profileForm.save();
});

Then('I should see a success alert', async () => {
  const alert = await dashboardPage.profileForm.successAlert;
  await alert.waitForDisplayed();
  const isDisplayed = await alert.isDisplayed();
  isDisplayed.should.be.true;
});

When('I create a new board named {string}', async (boardName) => {
  await dashboardPage.navbar.plusMenuButton.click();
  await dashboardPage.navbar.createBoardButton.click();
  await dashboardPage.navbar.createBoard(boardName);
  await dashboardPage.boardHeader.boardTitle.waitForDisplayed();
});

Then('the board title should be {string}', async (expectedTitle) => {
  const title = await dashboardPage.boardHeader.boardTitle.getText();
  title.should.equal(expectedTitle);
});

Given('I am on a board', async () => {
  await indexPage.open();
  const yourWorkspacesHeader = dashboardPage.boardIndex.yourWorkspacesHeader;
  await yourWorkspacesHeader.waitForDisplayed();
  const text = await yourWorkspacesHeader.getText();
  text.should.equal('YOUR WORKSPACES');

  const board = await dashboardPage.boardIndex.findBoard("My Test board")
  const isBoardExisting = await board.isExisting();
  isBoardExisting.should.be.true;

  if (isBoardExisting) {
    await board.click();
  } else {
    throw new Error('Board "My Test Board" was not found on the page.');
  }
});

When('I create a list called {string}', async (listName) => {
  const addNewListButtonDisplayed = await dashboardPage.list.addNewListButton;
  await addNewListButtonDisplayed.waitForExist({ timeout: 5000 });
  await addNewListButtonDisplayed.waitForDisplayed({ timeout: 5000 });

  if (addNewListButtonDisplayed.isDisplayed) {
    console.log("Button was found")
    await dashboardPage.list.addNewListButton.click();
    await dashboardPage.list.listNameInput.setValue(listName);
    await dashboardPage.list.addListButtonFinalStep.click();
  } else {
    console.log("Button was not found")
    await dashboardPage.list.listNameInput.setValue(listName);
    await dashboardPage.list.addListButtonFinalStep.click();
  }
});

Then('the list {string} should exist', async (listName) => {
  const listExists = await dashboardPage.list.listExists(listName);
  listExists.should.be.true;
});

Given('I have a list named {string}', async (listName) => {
  // Optionally verify or create the list; here assuming it exists or is created previously
});

When('I add a card named {string} to the list {string}', async (cardName, listName) => {
  await dashboardPage.list.addCardToList(listName, cardName);
});

Then('the card {string} in the list {string} should be displayed', async (cardName, listName) => {
  const newCard = await dashboardPage.list.findCardInList(listName, cardName);
  const isDisplayed = await newCard.isDisplayed();
  isDisplayed.should.be.true;
});

When('I filter cards by keyword {string}', async (keyword) => {
  await dashboardPage.boardHeader.filterButton.waitForClickable();
  await dashboardPage.boardHeader.filterButton.click();
  await dashboardPage.boardHeader.filterByKeyword(keyword);
});

Then('the filter result should include {string}', async (expectedText) => {
  const filterText = await dashboardPage.list.getFilterMatchText("Sprint Backlog");
  filterText.should.include(expectedText);
});

Given('I have a board open', async () => {
  // Implement verification or setup as needed
});

When('I delete the board', async () => {
  const menuButton = await dashboardPage.boardHeader.boardMenuButton;
  await menuButton.waitForDisplayed();
  await menuButton.click();

  const closeButton = await dashboardPage.boardHeader.closeBoardButton;
  await closeButton.waitForDisplayed();
  await closeButton.click();

  const confirmCloseButton = await dashboardPage.boardHeader.confirmCloseBoardButton;
  await confirmCloseButton.waitForDisplayed();
  await confirmCloseButton.click();
});
