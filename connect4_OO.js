/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
 class Game {
    constructor(HEIGHT,WIDTH,c1,c2) {
      this.WIDTH = WIDTH;
      this.HEIGHT = HEIGHT;
      this.currPlayer = '1';
      this.currColor = c1;
      this.colors = [c1,c2];
      this.makeBoard();
      this.makeHtmlBoard();
    }
    makeBoard() {
      this.board = [];
      for (let y = 0; y < this.HEIGHT; y++) {
        this.board.push(Array.from({ length: this.WIDTH }));
      }
    }
    makeHtmlBoard() {
      const htmlBoard = document.getElementById('board');
      htmlBoard.innerHTML = ''; // clear HTML on Restart
      const top = document.createElement('tr');
      top.setAttribute('id', 'row-top');
      this.toggleOnOff = this.handleClick.bind(this);
      top.addEventListener('click',this.toggleOnOff);
  
      for (let x = 0; x < this.WIDTH; x++) {
        const headCell = document.createElement('td');
        headCell.setAttribute('id', x);
        top.append(headCell);
      }
      htmlBoard.append(top);
  
      // make main part of board
      for (let y = 0; y < this.HEIGHT; y++) {
        const row = document.createElement('tr');
  
        for (let x = 0; x < this.WIDTH; x++) {
          const cell = document.createElement('td');
          cell.setAttribute('id', `${y}-${x}`);
          row.append(cell);
        }
        htmlBoard.append(row);
      }
    }
  
    findSpotForCol(x) {
      for (let y = this.HEIGHT - 1; y >= 0; y--) {
        if (!this.board[y][x]) {
          return y;
        }
      }
      return null;
    }
      /** placeInTable: update DOM to place piece into HTML table of board */
    placeInTable(y, x) {
      const piece = document.createElement('div');
      piece.classList.add('piece');
      piece.classList.add(`p${this.currPlayer}`);
      piece.style.backgroundColor = this.currColor.color;
      piece.style.top = -50 * (y + 2);
    
      const spot = document.getElementById(`${y}-${x}`);
      spot.append(piece);
    }
     /** endGame: announce game end */
    endGame(msg) {
      alert(msg);
      const top = document.querySelector("#row-top");
      top.removeEventListener("click", this.toggleOnOff);
    }
    
    /** handleClick: handle click of column top to play piece */
   handleClick(evt) {
      // get x from ID of clicked cell
      const x = +evt.target.id;
      // get next spot in column (if none, ignore click)
      const y = this.findSpotForCol(x);
      if (y === null) {
        return;
      }
      // place piece in board and add to HTML table
      this.board[y][x] = this.currPlayer;
  
      this.placeInTable(y, x);
        // check for win
      if (this.checkForWin()) {
        return this.endGame(`Player ${this.currPlayer} won!`);
      }
      // check for tie
      if (this.board.every(row => row.every(cell => cell))) {
        return this.endGame('Tie!');
      }
      // switch players
      this.currPlayer = this.currPlayer === '1' ? '2' : '1';
      this.currColor = this.currColor === this.colors[0] ? this.colors[1] : this.colors[0];
    }
    
    /** checkForWin: check board cell-by-cell for "does a win start here?" */
    checkForWin() {
         // Check four cells to see if they're all color of current player
        //  - cells: list of four (y, x) cells
        //  - returns true if all are legal coordinates & all match currPlayer
           const _win = cells =>
           cells.every(
          ([y, x]) =>
            y >= 0 &&
            y < this.HEIGHT &&
            x >= 0 &&
            x < this.WIDTH &&
            this.board[y][x] === this.currPlayer
        );
        
        
      for (let y = 0; y < this.HEIGHT; y++) {
        for (let x = 0; x < this.WIDTH; x++) {
          // get "check list" of 4 cells (starting here) for each of the different
          // ways to win
          const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
          const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
          const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
          const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
    
          // find winner (only checking each win-possibility as needed)
          if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
            return true;
          }
        }
      }
    }
  } // CLASS Game
  
  class Color {
    constructor(color){
      this.color = color;
    }
  }
  
  const btn = document.getElementById('start-game');
  btn.addEventListener('click', () => {
    let c1 = new Color(document.getElementById('color1').value);
    let c2 = new Color(document.getElementById('color2').value);
    new Game(6,7, c1, c2);
  });