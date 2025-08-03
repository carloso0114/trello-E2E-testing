Feature: Trello Board Management

  Scenario: Open the root page of Trello and login with my data
    Given I open the Trello root page
    When I log in with email "carlangas_o@hotmail.com" and password "9545C9545c"
    Then I should see the "YOUR WORKSPACES" header

  Scenario: Create a list
    Given I am on a board
    When I create a list called "Sprint Backlog"
    Then the list "Sprint Backlog" should exist

  Scenario: Create a card inside the "Sprint Backlog" list
    Given I have a list named "Sprint Backlog"
    When I add a card named "Test card from automation" to the list "Sprint Backlog"
    Then the card "Test card from automation" in the list "Sprint Backlog" should be displayed