// chess move algorithms
const BOARD_WIDTH = 8 // defines the width and length of a chess board in squares

// create and return a square object based on squareNumber
function locateSquare (squareNumber) {
  return {
    row: determineRow(squareNumber),
    column: determineColumn(squareNumber)
  }
}

// checks two square objects and returns true if they are the same square
function areSameSquare (square1, square2) {
  return square1.row === square2.row && square1.column === square2.column
}

// Determine if the squares are diagonal
function areDiagonal (originSquare, destinationSquare) {
  // This determines diagonality,
  // return false if squares are the same
  return (!areSameSquare(originSquare, destinationSquare)) &&
          (Math.abs(originSquare.row - destinationSquare.row) === Math.abs(originSquare.column - destinationSquare.column))
}

// Determine if squares are of opposite colors
function areOppositeColors (originSquare, destinationSquare) {
  // Check the difference between row and column.
  // If both are odd or both are even, they are the same color.
  // Otherwise they are not.
  return Math.abs(originSquare.row - originSquare.column) % 2 !== Math.abs(destinationSquare.row - destinationSquare.column) % 2
}

// calculate the row from square number alone
function determineRow (squareNumber) {
  return Math.floor(squareNumber / BOARD_WIDTH)
}

// calculate the column from square number alone
function determineColumn (squareNumber) {
  return squareNumber % BOARD_WIDTH
}

// check to see if the square number is out of range
function isOutOfRange (squareNumber) {
  return squareNumber < 0 || squareNumber > (BOARD_WIDTH * BOARD_WIDTH) - 1
}

// Main function. Used to determine number of chess moves it takes a bishop
// to go from origin square to destination square (numbered 0 - 63)
module.exports.numChessMovesBishop = (originNumber, destinationNumber) => {
  let originSquare = locateSquare(originNumber)
  let destinationSquare = locateSquare(destinationNumber)
  if (isOutOfRange(originNumber) || isOutOfRange(destinationNumber)) {
    throw new RangeError('Squares must be numbered 0 - 63')
  } else if (areDiagonal(originSquare, destinationSquare)) {
    return 1
  } else if (areOppositeColors(originSquare, destinationSquare)) {
    return -1
  } else if (originNumber === destinationNumber) {
    return 0
  } else {
    return 2
  }
}
