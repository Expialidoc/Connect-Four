/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
 let WIDTH = 7;
 let HEIGHT = 6;
 let totLen = WIDTH * HEIGHT;
 let currPlayer = 'p1'; // active player: 1 or 2
   // array of rows, each row is array of cells  (board[y][x])
  let board =[];
  let msg = 'Game is over: a draw!';
 /** makeBoard: create in-JS board structure:
  *    board = array of rows, each row is array of cells  (board[y][x])
  */
 
 function makeBoard() {
   // TODO: set "board" to empty HEIGHT x WIDTH matrix array
   //let totLen = WIDTH * HEIGHT;
       board = [...Array(totLen)].reduce((acc,next, ind) =>{
     const interNode = Math.floor(ind/WIDTH);                             // console.log(ind, WIDTH,ind/WIDTH);
      if(!acc[interNode]){
          acc[interNode] = [];
      }
      acc[interNode].push(next);
      return acc;
   }, []);                                                                // console.log(board);
         return board;
 }
 
 /** makeHtmlBoard: make HTML table and row of column tops. */
 
 function makeHtmlBoard() {
   // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
   let htmlBoard = document.querySelector('#board');
   // TODO: add comment for this code:
   //Creates top row for the Table and appends cells (headCell) to it
   let topRow = document.createElement("tr");
   topRow.setAttribute("id", "column-top");
   topRow.addEventListener("click", handleClick);
 
   for (let x = 0; x < WIDTH; x++) {
     let headCell = document.createElement("td");
     headCell.setAttribute("id", x);
     topRow.append(headCell);
   }
     htmlBoard.append(topRow);
 
   // TODO: add comment for this code
   //Creates y rows for the Table and appends cells (cell) to each
   for (let y = 0; y < HEIGHT; y++) {
     const tRow = document.createElement("tr");
       for (let x = 0; x < WIDTH; x++) {
         const cell = document.createElement("td");
         cell.setAttribute("id", `${y}-${x}`);
         tRow.append(cell);
     }
         htmlBoard.append(tRow);
   }
 }
 
 /** findSpotForCol: given column x, return top empty y (null if filled) */
 function findSpotForCol(x) {
   // TODO: write the real version of this, rather than always returning 0. //board.map((row,i) => { row[i].filter((el,ind) => {return el[ind]==undefined})})
     const arr1 = board.map((row) => {
         return row[x]});                                                   // console.log(arr1);
     //  return arr1.filter(el => el!==undefined).reduce((acc,next)=>acc+next, 0);
 //    const filled = arr1.filter(el => el!==undefined).reduce((acc,next)=>acc.push(next), []);--if currPlayer is a number !
     const filled = arr1.filter(el => el!==undefined).length;
                                                                          
     if((HEIGHT - filled -1) ===0){
       return 0;
     }
     return HEIGHT - filled - 1;
 }
 
 /** placeInTable: update DOM to place piece into HTML table of board */
 
 function placeInTable(y, x) {
   // TODO: make a div and insert into correct table cell
   const ball = document.createElement("DIV");
   ball.setAttribute("id", `${y}-${x}`);
   ball.classList.add('piece', `${currPlayer}`); //added classes .piece and p1 for currPlayer1
   let currCell = document.getElementById(`${y}-${x}`);
   currCell.append(ball);
 }
 
 /** endGame: announce game end */
 function endGame(msg) {
   // TODO: pop up alert message
   alert(msg);
 }
 
 /** handleClick: handle click of column top to play piece */
 function handleClick(evt) {
   // get x from ID of clicked cell
   let x = +evt.target.id;                                               
 
   // get next spot in column (if none, ignore click)
   let y = findSpotForCol(x);                                            
   if (y === null) {
     return;
   }
 
   // place piece in board and add to HTML table
   // TODO: add line to update in-memory board
   placeInTable(y, x);
   board[y][x] = currPlayer;
 
   // check for win
   if (checkForWin()) {
     return endGame(`Player ${currPlayer} won!`);
   }
 
   // check for tie
   // TODO: check if all cells in board are filled; if so call, call endGame
   if (board.map((row)=> row.every(el => el !==undefined)).every(item => item===true)){
     endGame(msg);
   }
     // switch players
   // TODO: switch currPlayer 1 <-> 2
   currPlayer === 'p1' ? currPlayer = 'p2' : currPlayer = 'p1';
                                                                          //  console.log(currPlayer);
 }
 
 /** checkForWin: check board cell-by-cell for "does a win start here?" */
 function checkForWin() {
   function _win(cells) {
     // Check four cells to see if they're all color of current player
     //  - cells: list of four (y, x) cells
     //  - returns true if all are legal coordinates & all match currPlayer
 
     return cells.every(
       ([y, x]) =>
         y >= 0 &&
         y < HEIGHT && //checks the range for rows
         x >= 0 &&
         x < WIDTH && //checks the range for columns
         board[y][x] === currPlayer //checks for the current player name
     );
   } 
 
   // TODO: read and understand this code. Add comments to help you.
 
   for (var y = 0; y < HEIGHT; y++) {
     for (var x = 0; x < WIDTH; x++) {                           //Starting in the upper left corner
       var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; //builds a chain of coordinate points horizontally
       var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
       var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];//builds a chain of coordinate points in a diagonal
       var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
                                                                //This process goes from UL to LR corner covering all cells 
       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {//For each take on coordinate chains
                                                                       //it checks if the current chain of 4 balls belongs to the same player
                                                                       //and is within the range of 6 x 7 (x x y)
         return true;
       }
     }
   }
 }
 
 makeBoard();
 makeHtmlBoard();