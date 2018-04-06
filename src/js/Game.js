import Block from './Block'
import View from './View'

/**
 * Main class responsible for everything what is going on in the game
 * @constructor Game
 */
class Game {
  constructor () {
    this.view = new View()
    this.actualBlock = {}
    this.sizeX = 0
    this.sizeY = 0
    this.landed = []
    this.paused = false
    this.score = 0
  }

  /**
   * Initalize the game and start it
   */
  init (sizeX, sizeY) {
    this.sizeX = sizeX
    this.sizeY = sizeY
    // Fill the landed array with empty tiles
    this.landed = Array(...Array(sizeX)).map(() => Array(sizeY))
    this.createBlock(Math.round(sizeX / 2), Math.round(sizeY / 2))
    this.startGameInterval(800)
  }

  startGameInterval (frameTime) {
    setInterval(() => {
      this.moveActualBlockDown()
    }, frameTime)
  }

  createBlock (x, y) {
    this.actualBlock = new Block(x, y)
  }

  /**
   * Moves actual block one row down (Acts like a gravity)
   */
  moveActualBlockDown () {
    // If any collision occurs - add the block to the landed blocks array
    if (this.checkBlockCollision(this.actualBlock) || this.actualBlock.pos.y === 0) {
      this.landBlock(this.actualBlock)
      this.createBlock(Math.round(this.sizeX / 2), Math.round(this.sizeY / 2))
    } else {
      this.actualBlock.pos.y -= 1
    }
  }

  /**
   * Adds actual block to the landed array
   */
  landBlock () {
    for (let x = 0; x < this.actualBlock.shape.length; x++) {
      for (let y = 0; y < this.actualBlock.shape[x]; y++) {
        this.landed[this.actualBlock.x + x][this.actualBlock.y + y] = 1
      }
    }
  }

  /**
   * Check actual block collision with landed blocks on the landed array
   */
  checkBlockCollision () {
    let collision = false
    for (let x = 0; x < this.actualBlock.shape.length; x++) {
      for (let y = 0; y < this.actualBlock.shape[x]; y++) {
        if (this.landed[x][y - 1] === 1) collision = true
      }
    }
    return collision
  }

  /**
   * Restart the game
   */
  restart () {
    this.landed = Array(...Array(this.sizeX)).map(() => Array(this.sizeY))
    this.createBlock(Math.round(this.sizeX / 2), Math.round(this.sizeY / 2))
  }

  /**
   * Fire when any key is pressed
   * @param {object} event - Document keydown event
   */
  keyDown (event) {
    let keyCode = event.keyCode
    if (keyCode === 83 || keyCode === 40) { // s OR down arrow
      this.moveActualBlockDown()
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
