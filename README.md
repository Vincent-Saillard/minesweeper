# Mine Sweeper
<div align=center>
  <a href="https://mine-sweeper-online.netlify.app/" target="_blank"><img src="https://github.com/Vincent-Saillard/minesweeper/assets/144067650/c7e6e8e8-3096-41c3-b1ec-7eedad9b9efa" width="400" height="400" margin-bottom="10px"/></a>
</div>
Personnal project using React-JS

## Description

A mini-game, based on traditional Minesweeper, with a medieval-fantasy sytle.

The idea came from a CodingGame session where I was asked to make a simple code. Given a grid of mine locations (where . are empty cells and x are mines), the goal was to display the grid like it appears if you win the game.
I decided to make a full project of this short game.

This project contains

- A script randomly generating a mine field with simple parameters : Width (number of columns), Height (number of lines), and Number of mines.
Using React component and css the grid is randomly created using different textures of tiles.
<p>Tiles close :</p>
<div>
  <img src="https://github.com/Vincent-Saillard/minesweeper/assets/144067650/3b2f7851-9f95-4eed-b05b-b6813e2e8f80" width="50" height="50"/>
  <img src="https://github.com/Vincent-Saillard/minesweeper/assets/144067650/966bed8d-691f-4c12-993b-b5064272a8f5" width="50" height="50"/>
  <img src="https://github.com/Vincent-Saillard/minesweeper/assets/144067650/6e01a903-ff99-47b2-9c77-bab3318b65d8" width="50" height="50"/>
  <img src="https://github.com/Vincent-Saillard/minesweeper/assets/144067650/7b0161aa-00ac-4a54-925d-2b1879308c45" width="50" height="50"/>
</div>
<p>Tiles open :</p>
<div>
  <img src="https://github.com/Vincent-Saillard/minesweeper/assets/144067650/d28eb94a-d3eb-4ba6-94fe-f5dea5c10946" width="50" height="50"/>
  <img src="https://github.com/Vincent-Saillard/minesweeper/assets/144067650/663961e4-ba88-4312-83e8-93677718b86b" width="50" height="50"/>
  <img src="https://github.com/Vincent-Saillard/minesweeper/assets/144067650/d559147b-82cb-4877-b480-59d8cf1cd86d" width="50" height="50"/>
  <img src="https://github.com/Vincent-Saillard/minesweeper/assets/144067650/c09dae93-8afc-4089-a097-30bf1f833a5f" width="50" height="50"/>
</div>

- A timer, starting at first player's click on a tile.
Timer stops/pauses wether player win/loose, or click on options/informations buttons, and it resets when player clicks on New Game button (changing parameters ingame will start a new game and reset timer).

- Information button : displays a modal with rules.
<img width="248" alt="image" src="https://github.com/Vincent-Saillard/minesweeper/assets/144067650/6b16e4fd-5777-4cd7-bfdd-06f8bccf4fdf">

- Settings button : displays a modal with game settings, closing will continue the ongoing game, modifying and accepting new settings will restart the game.
<img width="250" alt="image" src="https://github.com/Vincent-Saillard/minesweeper/assets/144067650/e489d511-cd47-4b6c-a276-f168fade30dd">


## Getting Started

If you want to test it on your local server, install needed dependencies with "yarn" and use "yarn dev" command, (app tested on Android)

### Dependencies

- react-native-async-storage
- react-navigation/bottom-tabs
- react-navigation/native
- react-navigation/native-stack
- axios
- expo
- expo-image-picker
- expo-location
- expo-status-bar
- lottie-react-native
- react-native
- react-native-keyboard-aware-scroll-view
- react-native-maps
- react-native-toast-message

### Demo

![ezgif com-video-to-gif-converted](https://github.com/Vincent-Saillard/airbnb-app_react-native/assets/144067650/11b478c5-4305-492f-b160-babee2da4254)

## Authors

Vincent Saillard

- https://www.linkedin.com/in/vincent-saillard-096255a7/
- https://github.com/Vincent-Saillard

Le Reacteur

- https://www.lereacteur.io/

