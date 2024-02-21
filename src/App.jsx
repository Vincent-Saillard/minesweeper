import { useEffect, useState } from "react";
import "./App.css";
import { minelandGenerator } from "./assets/script.js/minelandGenerator.js";
import Square from "../src/assets/Components/Square.jsx";

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

  if (numberOfSafeBlocks === numberOfDisp && minesRamaining === 0 && !endGame) {
    setEndGame("victory");
  }

  // submit function for options
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("width>>>" + width);
    console.log("height>>>" + height);
    console.log("num mines>>>" + numberOfMines);
    setOptionModal(false);
    setRefresh(!refresh);
  };

  return (
    <>
      <header>
        <div className="container">
          <div className="title">
            <h1>The Mine Sweeper</h1>
          </div>
          <div className="options" onClick={() => setOptionModal(!optionModal)}>
            Options
          </div>
        </div>
      </header>
      <main>
        <div className="container">
          <section className="infobar">
            <div className="leftInfoBar">
              <p>Number of Monsters : {numberOfMines}</p>
              <p className={minesRamaining < 0 ? "red" : ""}>
                Remaining Monsters : {minesRamaining}
              </p>
            </div>
            <div className="countdownContainer"></div>
            <div className="rightInfoBar">
              <div
                onClick={() => {
                  setRefresh(!refresh);
                  setEndGame("");
                }}
                className="restartButton"
              >
                New Game
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
                    onClick={() => setOptionModal(false)}
                  >
                    X
                  </div>
                  <p>Options</p>
                  <form onSubmit={handleSubmit}>
                    <label for="width">Number of blocks in width</label>
                    <input
                      type="range"
                      min={5}
                      max={40}
                      id="width"
                      value={width}
                      onChange={handleWidthChange}
                    />
                    <label for="height">Number of blocks in width</label>
                    <input
                      type="range"
                      min={5}
                      max={20}
                      id="height"
                      value={height}
                      onChange={handleHeightChange}
                    />
                    <label for="mines">Number of blocks in width</label>
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
    </>
  );
}

export default App;
