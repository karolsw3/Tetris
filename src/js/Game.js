/**
 * Main class responsible for everything what is going on in the game
 * @constructor Game
 */
class Game {
  constructor () {
    this.View = {}
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.board = []
    this.paused = false
    this.score = 0
  }

  /**
   * Initalize the game and start it
   */
  init (sizeX, sizeY) {
    // Fill the board with empty tiles
    this.board = Array(...Array(sizeX)).map(() => Array(sizeY))
  }

  /**
   * Restart the game
   */
  restart () {

  }

  /**
   * Resize canvas to standard width and height
   */
  resizeCanvas () {
    this.canvas.width = this.board.sizeX * this.board.tileWidth
    this.canvas.height = this.board.sizeY * this.board.tileWidth
  }

  /**
   * Fired when any key is pressed
   * @param {object} event - Document keydown event
   */
  keyDown (event) {
    let keyCode = event.keyCode
  }

  /**
   * Pause or unpause the game
   */
  togglePause () {
    this.paused = !this.paused
  }
}

export default Game
