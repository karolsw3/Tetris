import Block from './Block'
/**
 * Main class responsible for everything what is going on in the game
 * @constructor Game
 */
class Game {
  constructor () {
    this.View = {}
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.blocks = []
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
    this.createBlock(Math.round(sizeX / 2), Math.round(sizeY / 2))
    this.startGameInterval(800)
  }

  startGameInterval (frameTime) {
    setInterval(() => {
      this.moveBlocksDown()
    }, frameTime)
  }

  createBlock (x, y) {
    this.blocks.push(new Block(x, y))
  }

  /**
   * Moves all floating blocks one row down (Acts like a gravity)
   */
  moveBlocksDown () {
    this.blocks.map(block => {
      if (block.y > 0) { // TODO Check collisions between blocks
        block.y -= 1
      }
    })
  }

  /**
   * Restart the game
   */
  restart () {
    this.blocks = []
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
    if (keyCode === 83 || keyCode === 40) { // s OR down arrow
      this.moveBlocksDown()
    }
  }

  /**
   * Pause or unpause the game
   */
  togglePause () {
    this.paused = !this.paused
  }
}

export default Game
