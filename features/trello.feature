Feature: Trello Board Management

  Scenario: Open the root page of Trello and login with my data
    Given I open the Trello root page
    When I log in with email "carlangas_o@hotmail.com" and password "9545C9545c"
    Then I should see the "YOUR WORKSPACES" header

  Scenario: Edit user profile info
    Given I am logged in
    When I edit my profile username to "carloso0114" and bio to "Updated bio from test"
    Then I should see a success alert

  Scenario: Create a new board
    Given I am logged in
    When I create a new board named "My Test board"
    Then the board title should be "My Test board"

  Scenario: Create a list
    Given I am on a board
    When I create a list called "Sprint Backlog"
    Then the list "Sprint Backlog" should exist

  Scenario: Create a card inside the "Sprint Backlog" list
    Given I have a list named "Sprint Backlog"
    When I add a card named "Test card from automation" to the list "Sprint Backlog"
    Then the card "Test card from automation" in the list "Sprint Backlog" should be displayed

  Scenario: Filter cards on a board by card title
    Given I am on a board
    When I filter cards by keyword "Test card from automation"
    Then the filter result should include "matches filters"

  Scenario: Delete the board
    Given I have a board open
    When I delete the board
