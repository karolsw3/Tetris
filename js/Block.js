/**
 * Class responsible for providing information about block type and its location
 * @constructor Block
 */
export class Block {
  constructor (x, y) {
    // Generate Locations
    this.x = x
    this.y = y
    // Generate number from range ( 0 - 6 ) - 7 elements
    this.type = Math.round(Math.random() * 6) + 1
    this.shape = this.generateShape(this.type)
  }

  generateShape (type) {
    switch (type) {
      case 1:
        return [
          [1, 1, 1, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ]
      case 2:
        return [
          [1, 0, 0],
          [1, 1, 1],
          [0, 0, 0]
        ]
      case 3:
        return [
          [0, 0, 1],
          [1, 1, 1],
          [0, 0, 0]
        ]
      case 4:
        return [
          [1, 1],
          [1, 1]
        ]
      case 5:
        return [
          [0, 1, 1],
          [1, 1, 0],
          [0, 0, 0]
        ]
      case 6:
        return [
          [0, 1, 0],
          [1, 1, 1],
          [0, 0, 0]
        ]
      case 7:
        return [
          [1, 1, 0],
          [0, 1, 1],
          [0, 0, 0]
        ]
    }
  }

  rotate () {
    this.shape = this.shape.reverse()
    for (var i = 0; i < this.shape.length; i++) {
      for (var j = 0; j < i; j++) {
        var temp = this.shape[i][j]
        this.shape[i][j] = this.shape[j][i]
        this.shape[j][i] = temp
      }
    }
  }

  get color () {
    switch (this.type) {
      case 1:
        return 'blue'
      case 2:
        return 'red'
      case 3:
        return 'yellow'
      case 4:
        return 'green'
      case 5:
        return 'purple'
      case 6:
        return 'red'
      case 7:
        return 'blue'
    }
  }
}
