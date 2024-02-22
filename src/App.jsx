import { useEffect, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGear, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
library.add(faGear, faCircleInfo);
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import { minelandGenerator } from "./assets/script.js/minelandGenerator.js";
import Square from "../src/assets/Components/Square.jsx";
import logo from "../src/assets/pictures/logo.jpg";

function App() {
  const [fullTable, setFullTable] = useState([]);
  const [blockStatus, setBlockStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [width, setWidth] = useState(20);
  const [height, setHeight] = useState(20);
  const [numberOfMines, setNumberOfMines] = useState(50);
  const [refresh, setRefresh] = useState(true);
  const [endGame, setEndGame] = useState("");
  const [optionModal, setOptionModal] = useState(false);
  const [rulesModal, setRulesModal] = useState(false);
  const [numberOfClicks, setNumberOfClicks] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timeInterval, setTimeInterval] = useState(null);

  const handleWidthChange = (event) => {
    const value = event.target.value;
    setWidth(value);
  };
  const handleHeightChange = (event) => {
    const value = event.target.value;
    setHeight(value);
  };
  const handleMinesChange = (event) => {
    const value = event.target.value;
    setNumberOfMines(value);
  };

  // console.log(fullTable);
  useEffect(() => {
    // setWidth(20);
    // setHeight(20);
    // setNumberOfMines(100);
    const fullTable = minelandGenerator(width, height, numberOfMines);
    setFullTable(fullTable);
    const listOfStatus = [];
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        listOfStatus.push({
          coords: `${j},${i}`,
          status: "",
          content: fullTable[i][j],
          pictureNumber: Math.floor(Math.random() * 4),
        });
      }
    }
    // console.log(listOfStatus);
    setBlockStatus(listOfStatus);
    setIsLoading(false);
    setEndGame("");
    setNumberOfClicks(0);
  }, [refresh]);

  // get the number of flags (avoid status) from blockStatus List
  let numberOfFlags = 0;
  // get the number of block displayed
  let numberOfDisp = 0;
  for (let i = 0; i < blockStatus.length; i++) {
    if (blockStatus[i].status === "avoid") {
      numberOfFlags += 1;
    }
    if (blockStatus[i].status === "display") {
      numberOfDisp += 1;
    }
  }
  const minesRamaining = numberOfMines - numberOfFlags;
  const numberOfSafeBlocks = width * height - numberOfMines;

  // submit function for options
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("width>>>" + width);
    console.log("height>>>" + height);
    console.log("num mines>>>" + numberOfMines);
    setOptionModal(false);
    setRefresh(!refresh);
    resetTimer();
  };

  // TIMER FUNCTIONS
  // timer starts when number of blocks displayed > 0, and stops...
  // - when timer reaches 3600secs ==> endgame lost
  // - when endGame exists (victory or loss)
  // - when optionModal or rulesModal exists
  // timer should be reset
  // - when number of blocks displayed = 0

  // Function to start the timer
  const startTimer = () => {
    // Use setInterval to update the timer every 1000 milliseconds (1 second)
    setTimeInterval(
      setInterval(() => {
        // Update the timer by incrementing the previous value by 1
        setTimer((prev) => prev + 1);
      }, 1000)
    );
  };

  // Function to pause the timer
  const pauseTimer = () => {
    // Clear the interval to stop the timer from updating
    clearInterval(timeInterval);
  };

  // Function to reset the timer
  const resetTimer = () => {
    // Reset the timer value to 0
    setTimer(0);
    // Clear the interval to stop the timer
    clearInterval(timeInterval);
  };

  if (timer === 3600) {
    setTimer(0);
    setEndGame("lost");
    pauseTimer();
  }

  if (numberOfSafeBlocks === numberOfDisp && minesRamaining === 0 && !endGame) {
    setEndGame("victory");
    pauseTimer();
  }

  // transform timer in seconds in mm:ss format
  const minutes = "0" + Math.floor(timer / 60);
  const seconds = "0" + (timer % 60);
  const formatedTimer = `${minutes.slice(-2)} : ${seconds.slice(-2)}`;

  return (
    <>
      <header>
        <div className="container">
          <div className="logoContainer">
            {/* <h1>The Mine Sweeper</h1> */}
            <img
              src={logo}
              alt="a dwarf in low poly with pick axe on his shoulder, elbowed on title Mine Sweeper"
            />
          </div>
          <div className="title">
            <h1>MINE SWEEPER</h1>
          </div>
          <div className="sideButtons">
            <div className="sideButtonsBorder">
              <div>
                <div
                  className="options"
                  onClick={() => {
                    setRulesModal(true);
                    pauseTimer();
                  }}
                >
                  <FontAwesomeIcon icon="circle-info" className="gearIcon" />
                </div>
                <div
                  className="options"
                  onClick={() => {
                    setOptionModal(true);
                    pauseTimer();
                  }}
                >
                  <FontAwesomeIcon icon="gear" className="gearIcon" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="borderBottomHeader"></div>
      </header>
      <main>
        <div className="container">
          <section className="infobar">
            <div className="leftInfoBar">
              <div className="infoContainer">
                <p>Number of Monsters : {numberOfMines}</p>
                <p className={minesRamaining < 0 ? "red" : ""}>
                  Remaining Monsters : {minesRamaining}
                </p>
              </div>
            </div>
            <div className="countdownContainer">
              <div className="countdownBorder">
                <div className="corners tl"></div>
                <div className="corners tr"></div>
                <div className="corners bl"></div>
                <div className="corners br"></div>
                <p>{formatedTimer}</p>
              </div>
            </div>
            <div className="rightInfoBar">
              <div
                onClick={() => {
                  setRefresh(!refresh);
                  setEndGame("");
                  resetTimer();
                }}
                className="restartButton"
              >
                <p>New Game</p>
              </div>
            </div>
          </section>
          <section className="gamingArea">
            {!isLoading &&
              fullTable.map((line, index) => {
                return (
                  <div className="line" key={index}>
                    {line.map((blockContent, index2) => {
                      return (
                        <Square
                          content={blockContent}
                          Xcoord={index2}
                          Ycoord={index}
                          blockStatus={blockStatus}
                          setBlockStatus={setBlockStatus}
                          width={width}
                          height={height}
                          key={index2}
                          setEndGame={setEndGame}
                          numberOfClicks={numberOfClicks}
                          setNumberOfClicks={setNumberOfClicks}
                          startTimer={startTimer}
                          pauseTimer={pauseTimer}
                        />
                      );
                    })}
                  </div>
                );
              })}
            {endGame ? (
              <div className="endGameModal">
                <div className="endingMessage">
                  <p>
                    {endGame === "victory"
                      ? "Congratulations, You won ! Try again ?"
                      : "You lost, try again ?"}
                  </p>
                </div>
              </div>
            ) : null}
            {optionModal ? (
              <div className="endGameModal">
                <div className="optionsContainer">
                  <div
                    className="closing"
                    onClick={() => {
                      setOptionModal(false);
                      if (numberOfClicks > 0) {
                        startTimer();
                      }
                    }}
                  >
                    X
                  </div>
                  <p>Options</p>
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="width">Number of blocks in width</label>
                    <input
                      type="range"
                      min={5}
                      max={40}
                      id="width"
                      value={width}
                      onChange={handleWidthChange}
                    />
                    <label htmlFor="height">Number of blocks in width</label>
                    <input
                      type="range"
                      min={5}
                      max={20}
                      id="height"
                      value={height}
                      onChange={handleHeightChange}
                    />
                    <label htmlFor="mines">Number of blocks in width</label>
                    <input
                      type="range"
                      min={1}
                      max={width * height - 1}
                      id="mines"
                      value={numberOfMines}
                      onChange={handleMinesChange}
                    />
                    <input type="submit" value="Modify" />
                  </form>
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </main>
      <footer>
        <div className="borderTopFooter"></div>
      </footer>
    </>
  );
}

export default App;
