const IndexPage = require('./../po/pages/index.page')
const LoginPage = require('./../po/pages/login.page');
const DashboardPage = require('./../po/pages/dashboard.page')

const indexPage = new IndexPage()
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage

describe("Trello", () => {

  beforeEach( async() => {
    await browser.maximizeWindow();
  })

  it("should open the root page of trello and login with my data", async () => {
    await indexPage.open()
    const loginButton = await indexPage.headermenu.loginLink;
    const loginForm = loginPage.form;

    await loginButton.click();
    await loginForm.loginWithEmail("carlangas_o@hotmail.com", "9545C9545c");
    await browser.pause(6000);
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain('/boards');
  })

  it("Edits user profile info", async () => {
    await dashboardPage.navbar.goToProfileSettings();
    await dashboardPage.profileForm.setUsername("carloso0114");
    await dashboardPage.profileForm.setBio("Updated bio from test");
    await dashboardPage.profileForm.save();
    await browser.pause(1000); 

    const alert = await dashboardPage.profileForm.successAlert;
    await expect(alert).toBeDisplayed();
    expect(await alert.getText()).toContain('Saved');
  })

  it("creates a new board", async () => {
    await dashboardPage.navbar.logoHomeLink.click();
    await dashboardPage.navbar.plusMenuButton.click();   
    await dashboardPage.navbar.createBoardButton.click();
    await dashboardPage.navbar.createBoard("My Test board"); 
    await dashboardPage.boardHeader.boardTitle.waitForDisplayed();
    expect(await dashboardPage.boardHeader.boardTitle.getText()).toBe('My Test board');
  });

  it("creates a list", async () => {
    await dashboardPage.list.add("Sprint Backlog");
    const exists = await dashboardPage.list.listExists("Sprint Backlog");
    expect(exists).toBe(true);
  });

  it("creates a card inside the 'Sprint Backlog' list", async () => {
    await dashboardPage.list.addCard("Sprint Backlog", "my test card");
    const exists = await dashboardPage.list.cardExists("Sprint Backlog", "my test card");
    expect(exists).toBe(true);
    await browser.pause(10000); 
  });

  it("filters cards on a board by card title", async () => {
    await dashboardPage.boardHeader.filterButton.waitForClickable();
    await dashboardPage.boardHeader.filterButton.click();
    await dashboardPage.boardHeader.filterByKeyword("my test");
    const text = await dashboardPage.list.getFilterMatchText("Sprint Backlog");
    expect(text).toBe("1 card matches filters");
    
    // await browser.debug()
    // await browser.pause(20000); 

  });

  
})