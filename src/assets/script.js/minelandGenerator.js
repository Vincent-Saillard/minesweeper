export function minelandGenerator(width, height, numberOfMines) {
  // create an array containing unique pair of coordinates for every mine in field
  const listOfMinesCoords = [];

  const generatePair = (width, height) => {
    // generate X between 0 and width - 1 included
    const mineX = Math.floor(Math.random() * width);
    // generate Y between 0 and height - 1 included
    const mineY = Math.floor(Math.random() * height);
    const coords = `${mineX},${mineY}`;
    return coords;
  };

  for (let i = 0; i < numberOfMines; i++) {
    // for each mine generate a pair of unique coordinates and push in list
    let coordPair = generatePair(width, height);
    while (listOfMinesCoords.includes(coordPair)) {
      coordPair = generatePair(width, height);
      // console.log("already in");
    }
    listOfMinesCoords.push(coordPair);
  }

  // console.log(listOfMinesCoords);

  // for a given list of mine's coordinates, create a table of height lines of width digits, "x" stands for a mine, "0" stands for no mine
  const simpleTable = [];
  for (let i = 0; i < height; i++) {
    const line = [];
    for (let j = 0; j < width; j++) {
      if (listOfMinesCoords.includes(`${j},${i}`)) {
        line.push("x");
      } else {
        line.push(0);
      }
    }
    simpleTable.push(line);
  }

  // console.log(simpleTable);

  // create the corresponding table with appropriate numbers around mines
  const fullTable = [...simpleTable];

  for (let i = 0; i < fullTable.length; i++) {
    for (let j = 0; j < fullTable[i].length; j++) {
      if (fullTable[i][j] === "x") {
        // previous line
        if (i !== 0) {
          // top digit
          if (fullTable[i - 1][j] !== "x") {
            fullTable[i - 1][j] += 1;
          }
          // top left digit
          if (j !== 0 && fullTable[i - 1][j - 1] !== "x") {
            fullTable[i - 1][j - 1] += 1;
          }
          //top right digit
          if (
            j !== fullTable[i].length - 1 &&
            fullTable[i - 1][j + 1] !== "x"
          ) {
            fullTable[i - 1][j + 1] += 1;
          }
        }
        // same line left
        if (j !== 0 && fullTable[i][j - 1] !== "x") {
          fullTable[i][j - 1] += 1;
        }
        // same line right
        if (j !== fullTable[i].length - 1 && fullTable[i][j + 1] !== "x") {
          fullTable[i][j + 1] += 1;
        }
        // next line
        if (i !== fullTable.length - 1) {
          // bottom digit
          if (fullTable[i + 1][j] !== "x") {
            fullTable[i + 1][j] += 1;
          }
          // bottom left digit
          if (j !== 0 && fullTable[i + 1][j - 1] !== "x") {
            fullTable[i + 1][j - 1] += 1;
          }
          // bottom right digit
          if (
            j !== fullTable[i].length - 1 &&
            fullTable[i + 1][j + 1] !== "x"
          ) {
            fullTable[i + 1][j + 1] += 1;
          }
        }
      }
    }
  }

  // console.log(fullTable);
  return fullTable;
  // fullTable.forEach((element) => console.log(element.join(",")));
}
