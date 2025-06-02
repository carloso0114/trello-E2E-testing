const chai = require('chai');
chai.should();

const IndexPage = require('./../po/pages/index.page');
const LoginPage = require('./../po/pages/login.page');
const DashboardPage = require('./../po/pages/dashboard.page');

const indexPage = new IndexPage();
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage
const listName = "Sprint Backlog"
const cardName = "Test card from automation"
const email = "carlangas_o@hotmail.com"  //update this with your own credentials
const password = "9545C9545c" //update this with your own credentials
// when you sign with my credentials a verification email is sent to me... 2FA is deactivated on my account, but still.


describe("Trello - BDD Style with Should", () => {

  beforeEach( async() => {
    await browser.setWindowSize(1920, 1080);
  })

  it("should open the root page of trello and login with my data", async () => {
    await indexPage.open()
    const loginButton = await indexPage.headermenu.loginLink;
    const loginForm = loginPage.form;

    await loginButton.click();
    await loginForm.loginWithEmail(email, password);
    const yourWorkspacesHeader = dashboardPage.boardIndex.yourWorkspacesHeader
    await expect(yourWorkspacesHeader).toBeDisplayed();
    await expect(yourWorkspacesHeader).toHaveText("YOUR WORKSPACES");
  })

  it("should edit user profile info", async () => {
    await dashboardPage.navbar.goToProfileSettings();
    await dashboardPage.profileForm.setUsername("carloso0114");
    await dashboardPage.profileForm.setBio("Updated bio from test");
    await dashboardPage.profileForm.save();

    const toast = dashboardPage.profileForm.successAlert;
    await toast.waitForDisplayed();
    await browser.waitUntil(async () => (await toast.getText()).includes('Saved'));
  })

  it("should create a new board", async () => {
    await dashboardPage.navbar.logoHomeLink.click();
    await dashboardPage.navbar.plusMenuButton.click();   
    await dashboardPage.navbar.createBoardButton.click();
    await dashboardPage.navbar.createBoard("My Test board"); 
    await dashboardPage.boardHeader.boardTitle.waitForDisplayed();
    
    (await dashboardPage.boardHeader.boardTitle.getText()).should.equal('My Test board');
  });

  it("creates a list", async () => {
    const isDisplayed = await dashboardPage.list.addNewListButton.isDisplayed();
    if (isDisplayed) {
      await dashboardPage.list.addNewListButton.click()
      await dashboardPage.list.listNameInput.setValue(listName)
      await dashboardPage.list.addListButtonFinalStep.click()
    } else {
      await dashboardPage.list.listNameInput.setValue(listName)
      await dashboardPage.list.addListButtonFinalStep.click()
    }
    const list = await dashboardPage.list.listExists(listName);
    expect(list).toBe(true);
  });

  it("creates a card inside the 'Sprint Backlog' list", async () => {
    await dashboardPage.list.addCardToList(listName, cardName);
    const newCard = await dashboardPage.list.findCardInList(listName, cardName);
    await expect(newCard).toBeDisplayed();
  });

  it("should filter cards on a board by card title", async () => {
    await dashboardPage.boardHeader.filterButton.waitForClickable();
    await dashboardPage.boardHeader.filterButton.click();
    await dashboardPage.boardHeader.filterByKeyword(cardName);
    const filterText = await dashboardPage.list.getFilterMatchText(listName);
    expect(filterText).toContain("matches filters");
  });

  it("deletes the board", async () => {
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

})