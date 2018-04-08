import { Block } from './Block.js'
import { View } from './View.js'

/**
 * Main class responsible for everything what is going on in the game
 * @constructor Game
 */
export class Game {
  constructor () {
    this.actualBlock = {}
    this.sizeX = 0
    this.view = {}
    this.sizeY = 0
    this.landed = []
    this.paused = false
    this.score = 0
  }

  /**
   * Initalize the game and start it
   */
  init (sizeX, sizeY) {
    this.view = new View(sizeX, sizeY)
    this.sizeX = sizeX
    this.sizeY = sizeY
    // Fill the landed array with empty tiles
    this.landed = Array(...Array(sizeX)).map(() => Array(sizeY).fill(0))
    this.createBlock(Math.round(sizeX / 2), Math.round(sizeY / 2))
    this.startGameInterval(200)

    document.addEventListener('keydown', (e) => this.keyDown(e))
  }

  startGameInterval (frameTime) {
    setInterval(() => {
      this.moveActualBlockDown()
    }, frameTime)
    setInterval(() => {
      this.view.renderFrame(this.landed, this.actualBlock)
    }, 10)
  }

  createBlock (x, y) {
    this.actualBlock = new Block(x, y)
  }

  /**
   * Moves actual block one row down (Acts like a gravity)
   */
  moveActualBlockDown () {
    // If any collision occurs - add the block to the landed blocks array
    if (this.checkBlockCollision('down')) {
      this.landBlock()
      this.checkFullRow()
      this.createBlock(Math.floor(this.sizeX / 2), this.sizeY - 3)
    } else {
      this.actualBlock.y -= 1
    }
  }

  moveActualBlockLeft () {
    if (!this.checkBlockCollision('left')) {
      try {
        this.actualBlock.x--
      } catch (e) {}
    }
  }

  moveActualBlockRight () {
    if (!this.checkBlockCollision('right')) {
      try {
        this.actualBlock.x++
      } catch (e) {}
    }
  }

  /**
   * Adds actual block to the landed array
   */
  landBlock () {
    for (let x = 0; x < this.actualBlock.shape.length; x++) {
      for (let y = 0; y < this.actualBlock.shape[x].length; y++) {
        if (this.actualBlock.shape[x][y] === 1) {
          this.landed[this.actualBlock.x + x][this.actualBlock.y + y] = this.actualBlock.type
        }
      }
    }
  }

  /**
   * Check actual block collision with landed blocks on the landed array
   */
  checkBlockCollision (direction) {
    let collision = false
    for (let x = 0; x < this.actualBlock.shape.length; x++) {
      for (let y = 0; y < this.actualBlock.shape[x].length; y++) {
        if (this.actualBlock.shape[x][y] === 1) {
          try {
            switch (direction) {
              case 'down':
                if (this.landed[this.actualBlock.x + x][this.actualBlock.y + y - 1] !== 0) collision = true
                else if (this.actualBlock.y + y === 0) collision = true
                break
              case 'left':
                if (this.landed[this.actualBlock.x + x - 1][this.actualBlock.y + y] !== 0) collision = true
                break
              case 'right':
                if (this.landed[this.actualBlock.x + x + 1][this.actualBlock.y + y] !== 0) collision = true
                break
            }
          } catch (e) { collision = true }
        }
      }
    }
    return collision
  }

  /**
   * Checks is there is a row filled with blocks in landed matrix and clears it raising the game score
   */
  checkFullRow () {
    for (let row = 0; row < this.landed[0].length; row++) {
      let result = true
      for (let col = 0; col < this.landed.length; col++) {
        if (this.landed[col][row] === 0) result = false
      }
      if (result) {
        this.moveLandedDown(row)
        this.score += 100
      }
    }
  }

  /**
   * Move all landed blocks one row down starting from given row
   * @param {number} row - Number of row from which to start
   */
  moveLandedDown (row) {
    for (let y = row; y < this.landed[0].length - 1; y++) {
      for (let col = 0; col < this.landed.length; col++) {
        this.landed[col][y] = this.landed[col][y + 1]
      }
    }
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
    if (keyCode === 68 || keyCode === 39) { // d OR right arrow
      this.moveActualBlockRight()
    }
    if (keyCode === 65 || keyCode === 37) { // a OR left arrow
      this.moveActualBlockLeft()
    }
    if (keyCode === 87 || keyCode === 38) { // w OR up arrow
      this.actualBlock.rotate()
      // Do not rotate if any collision occurs
      for (let i = 0; i < 3; i++) {
        if (this.checkBlockCollision('right') || this.checkBlockCollision('left')) {
          this.actualBlock.rotate()
        }
      }
    }
  }

  /**
   * Pause or unpause the game
   */
  togglePause () {
    this.paused = !this.paused
  }
}
