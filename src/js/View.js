/**
 * Class responsible for game visual display
 * @constructor View
 */
class View {
  constructor () {
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.backgroundColor = '#111211'
    this.tileWidth = 20
  }

  /**
   * Public method of rendering the game frame
   * @param {array} landed - Array of landed blocks
   * @param {object} actualBlock - Actual falling block
   */
  renderFrame (landed, actualBlock) {
    this._drawBackground(this.backgroundColor)
    for (let i = 0; i < landed.length; i++) {
      for (let j = 0; j < landed[0].length; j++) {
        if (landed[i][j] === 1) {
          this._drawSquare(i, j, this.tileWidth, '#aaaaaa')
        }
      }
    }
    this._renderBlock(actualBlock.x, actualBlock.y, actualBlock.shape, actualBlock.color)
  }

  /**
   * Resize canvas to standard width and height
   */
  resizeCanvas () {
    this.canvas.width = this.landed.sizeX * this.landed.tileWidth
    this.canvas.height = this.landed.sizeY * this.landed.tileWidth
  }

  _renderBlock (x, y, shape, color) {
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[0].length; j++) {
        if (shape[i][j] === 1) {
          this._drawSquare(x, y, this.tileWidth, color)
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
    this.ctx.fillStyle(color)
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

export default View
