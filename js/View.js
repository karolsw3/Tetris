import { Block } from './Block.js'

/**
 * Class responsible for game visual display
 * @constructor View
 */
export class View {
  constructor (sizeX, sizeY) {
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.text = document.getElementsByClassName('text')[0]
    this.backgroundColor = '#111211'
    this.tileWidth = window.innerHeight / sizeY
    this.resizeCanvas(sizeX, sizeY)
  }

  /**
   * Public method of rendering the game frame
   * @param {array} landed - Array of landed blocks
   * @param {object} actualBlock - Actual falling block
   */
  renderFrame (landed, actualBlock) {
    this._drawBackground(this.backgroundColor)
    for (let i = 0; i < landed.length; i++) {
      for (let j = 0; j < landed[i].length; j++) {
        if (landed[i][j] !== 0) {
          // Create new block to get its color by its type
          let block = new Block(900, 900)
          block.type = landed[i][j]
          this._drawSquare(i, j, this.tileWidth, block.color)
        }
      }
    }
    this._renderBlock(actualBlock.x, actualBlock.y, actualBlock.shape, actualBlock.color)
  }

  /**
   * Displays specified text on the middle of the canvas
   * @param {string} text - Text to be shown
   */
  renderText (text) {
    this.text.innerHTML = text
  }

  /**
   * Resize canvas to standard width and height
   */
  resizeCanvas (sizeX, sizeY) {
    this.canvas.width = sizeX * this.tileWidth
    this.canvas.height = sizeY * this.tileWidth
  }

  _renderBlock (x, y, shape, color) {
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (shape[i][j] === 1) {
          this._drawSquare(x + i, y + j, this.tileWidth, color)
        }
      }
    }
  }

  _drawSquare (x, y, a, color) {
    this.ctx.beginPath()
    this.ctx.rect(x * a, y * a, a, a)
    this.ctx.fillStyle = color
    this.ctx.fill()
  }

  _drawBackground (color) {
    this.ctx.fillStyle = color
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }
}
