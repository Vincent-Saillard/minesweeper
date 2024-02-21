import "../Components/square.css";

const Square = ({
  content,
  Xcoord,
  Ycoord,
  blockStatus,
  setBlockStatus,
  width,
  height,
  setEndGame,
}) => {
  // get status of block from blockStatus state
  // get block coords
  const blockCoords = `${Xcoord},${Ycoord}`;
  // create list of coords from blockStatus list of objects and list of status accordingly
  const allCoordsList = [];
  const allStatusList = [];
  const allContentList = [];
  const allPicNumberList = [];
  for (let i = 0; i < blockStatus.length; i++) {
    allCoordsList.push(blockStatus[i].coords);
    allStatusList.push(blockStatus[i].status);
    allContentList.push(blockStatus[i].content);
    allPicNumberList.push(blockStatus[i].pictureNumber);
  }
  // get index in list of current block coords
  const blockPosition = allCoordsList.indexOf(blockCoords);
  const status = allStatusList[blockPosition];
  const pictureNumber = allPicNumberList[blockPosition];

  let valueToDisplay = "";
  if (!status) {
    valueToDisplay = "";
  }
  if (status === "avoid") {
    valueToDisplay = "🚩";
  }
  if (status === "display") {
    if (content === 0) {
      valueToDisplay = "";
    }
    if (content === "x") {
      valueToDisplay = "🧌";
    }
    if (content > 0) {
      valueToDisplay = content;
    }
  }

  // reveal function, display block giving coords
  const revealBlockByCoords = (X, Y) => {
    // get content value from object in blockStatus list with given coords
    const blockCoordsToReveal = `${X},${Y}`;
    const blockPositionToReveal = allCoordsList.indexOf(blockCoordsToReveal);
    const blockContentToReveal = allContentList[blockPositionToReveal];
    const newBlockStatusList = [...blockStatus];
    // if content = x reveal all / end of game
    if (blockContentToReveal === "x") {
      for (let i = 0; i < newBlockStatusList.length; i++) {
        newBlockStatusList[i].status = "display";
      }
      setBlockStatus(newBlockStatusList);
      setEndGame("lost");
    }
    // if content > 0 reveal only this block
    if (blockContentToReveal > 0) {
      newBlockStatusList[blockPositionToReveal].status = "display";
      setBlockStatus(newBlockStatusList);
    }
    // if content = 0 reveal it and reveal all blocks around
    if (blockContentToReveal === 0) {
      newBlockStatusList[blockPositionToReveal].status = "display";
      // top left
      if (
        X > 0 &&
        Y > 0 &&
        !allStatusList[allCoordsList.indexOf(`${X - 1},${Y - 1}`)]
      ) {
        //   revealBlockByCoords(X - 1, Y - 1);
        newBlockStatusList[allCoordsList.indexOf(`${X - 1},${Y - 1}`)].status =
          "display";
      }
      // top
      if (Y > 0 && !allStatusList[allCoordsList.indexOf(`${X},${Y - 1}`)]) {
        //   revealBlockByCoords(X, Y - 1);
        newBlockStatusList[allCoordsList.indexOf(`${X},${Y - 1}`)].status =
          "display";
      }
      // top right
      if (
        Y > 0 &&
        X < width - 2 &&
        !allStatusList[allCoordsList.indexOf(`${X + 1},${Y - 1}`)]
      ) {
        //   revealBlockByCoords(X + 1, Y - 1);
        newBlockStatusList[allCoordsList.indexOf(`${X + 1},${Y - 1}`)].status =
          "display";
      }
      // left
      if (X > 0 && !allStatusList[allCoordsList.indexOf(`${X - 1},${Y}`)]) {
        //   revealBlockByCoords(X - 1, Y);
        newBlockStatusList[allCoordsList.indexOf(`${X - 1},${Y}`)].status =
          "display";
      }
      // right
      if (
        X < width - 2 &&
        !allStatusList[allCoordsList.indexOf(`${X + 1},${Y}`)]
      ) {
        //   revealBlockByCoords(X + 1, Y);
        newBlockStatusList[allCoordsList.indexOf(`${X + 1},${Y}`)].status =
          "display";
      }
      // bottom left
      if (
        X > 0 &&
        Y < height - 2 &&
        !allStatusList[allCoordsList.indexOf(`${X - 1},${Y + 1}`)]
      ) {
        //   revealBlockByCoords(X - 1, Y + 1);
        newBlockStatusList[allCoordsList.indexOf(`${X - 1},${Y + 1}`)].status =
          "display";
      }
      // bottom
      if (
        Y < height - 2 &&
        !allStatusList[allCoordsList.indexOf(`${X},${Y + 1}`)]
      ) {
        //   revealBlockByCoords(X, Y + 1);
        newBlockStatusList[allCoordsList.indexOf(`${X},${Y + 1}`)].status =
          "display";
      }
      // bottom right
      if (
        X < width - 2 &&
        Y < height - 2 &&
        !allStatusList[allCoordsList.indexOf(`${X + 1},${Y + 1}`)]
      ) {
        //   revealBlockByCoords(X + 1, Y + 1);
        newBlockStatusList[allCoordsList.indexOf(`${X + 1},${Y + 1}`)].status =
          "display";
      }
      setBlockStatus(newBlockStatusList);
    }
  };

  const handleLeftClick = () => {
    // if status = avoid or display do nothing
    // if status = "" reveal block by coords
    if (!status) {
      revealBlockByCoords(Xcoord, Ycoord);
    }
    // console.log(`left click / ${blockCoords} / ${status}`);
  };

  const handleAuxClick = (event) => {
    event.preventDefault();
    // if status = display, do nothing
    // if status = "" change as avoid
    // if status = avoid change as ""
    const newBlockStatusList = [...blockStatus];
    if (!status) {
      newBlockStatusList[blockPosition].status = "avoid";
      setBlockStatus(newBlockStatusList);
    } else if (status === "avoid") {
      newBlockStatusList[blockPosition].status = "";
      setBlockStatus(newBlockStatusList);
    }
    // console.log(`aux click / ${blockCoords} / ${status}`);
  };

  return (
    <div
      className={
        status === "display"
          ? `square lightGrey light${pictureNumber}`
          : `square darkGrey dark${pictureNumber}`
      }
      onClick={handleLeftClick}
      onContextMenu={handleAuxClick}
    >
      {valueToDisplay}
    </div>
  );
};

export default Square;
