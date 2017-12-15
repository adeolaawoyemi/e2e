Feature: Player loads and plays within 2 seconds
 In order to maintain a good load time for the Player
 As a Product Manager
 I want to keep track of the load time
 So that I can see be sure of the Player's performance

    Background:
      Given I'm visiting a video page
       When the player is loaded

    @loadtime
     Scenario: Player Load
       Then I expect that the player loads within "2000" ms
      
     Scenario: Extra loaded
       Then I expect that the player has an extra
      
