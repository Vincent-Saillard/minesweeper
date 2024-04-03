# Mine Sweeper
<div align=center>
<img src="https://github.com/Vincent-Saillard/minesweeper/assets/144067650/c7e6e8e8-3096-41c3-b1ec-7eedad9b9efa" width="400" height="400" margin-bottom="10px"/>
<div background-color="green" color="green">
  <a href="https://mine-sweeper-online.netlify.app/" target="_blank" style="color:white;font-style:none">JOUER</a>
</div>
</div>
Personnal project using React-JS

## Description

A mini-game, based on traditional Minesweeper, with a medieval-fantasy sytle.

The idea came from a CodingGame session where I was asked to make a simple code. Given a grid of mine locations (where . are empty cells and x are mines), the goal was to display the grid like it appears if you win the game.
I decided to make a full project of this short game.

This project contains

- A script randomly generating a mine field with simple parameters : Width (number of columns), Height (number of lines), and Number of mines.
Using React component and css the grid is randomly created using different textures of tiles.
<br/>
<p>Tiles closed :</p>
<div>
  <img src="https://github.com/Vincent-Saillard/minesweeper/assets/144067650/3b2f7851-9f95-4eed-b05b-b6813e2e8f80" width="50" height="50"/>
  <img src="https://github.com/Vincent-Saillard/minesweeper/assets/144067650/3b2f7851-9f95-4eed-b05b-b6813e2e8f80" width="50" height="50"/>
  <img src="https://github.com/Vincent-Saillard/minesweeper/assets/144067650/3b2f7851-9f95-4eed-b05b-b6813e2e8f80" width="50" height="50"/>
  <img src="https://github.com/Vincent-Saillard/minesweeper/assets/144067650/3b2f7851-9f95-4eed-b05b-b6813e2e8f80" width="50" height="50"/>
</div>


- Bottom tabulation : 
  - Home screen displaying offers thanks to FlatList (to avoid mobile app to crash because of memory consumption)
  - Map using geolocation data (app asks for user's premission)
  - User profile page , where user can change profile picture by accessing to his gallery or taking a photo using his camera. He can also modify data such as mail, username and description.
He can also log out, deleting token in mobile memory, he will be redirected to signIn screen automatically.
- Offer's screens with description and minimap, accessible either from Home by clicking on an offer, or from the map by clicking on a pin.

The app is connected to Le Reacteur API and will not be accessible in March 2024.

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

