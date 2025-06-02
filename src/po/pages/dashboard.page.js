const NavBarComponent = require('../components/dashboard/navbar.component');
const ProfileFormComponent = require('../components/dashboard/profileform.component');
const BoardHeaderComponent = require('../components/dashboard/boardheader.component')
const ListComponent = require('../components/dashboard/list.component');
const BoardIndexComponent = require('../components/dashboard/boardindex.component');

class DashboardPage {
  constructor() {
    this.navbar = new NavBarComponent();
    this.profileForm = new ProfileFormComponent();
    this.boardHeader = new BoardHeaderComponent();
    this.list = new ListComponent();
    this.boardIndex = new BoardIndexComponent();
  }
}

module.exports = DashboardPage;