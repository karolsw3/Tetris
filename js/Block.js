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
    this.type = Math.round(Math.random() * 6)
  }

  get shape () {
    switch (this.type) {
      case 0:
        return [
          [1, 1, 1, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ]
      case 1:
        return [
          [1, 0, 0, 0],
          [1, 1, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ]
      case 2:
        return [
          [0, 0, 1, 0],
          [1, 1, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ]
      case 3:
        return [
          [1, 1, 0, 0],
          [1, 1, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ]
      case 4:
        return [
          [0, 1, 1, 0],
          [1, 1, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ]
      case 5:
        return [
          [0, 1, 0, 0],
          [1, 1, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ]
      case 6:
        return [
          [1, 1, 0, 0],
          [0, 1, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ]
    }
  }

  get color () {
    switch (this.type) {
      case 0:
        return 'blue'
      case 1:
        return 'red'
      case 2:
        return 'yellow'
      case 3:
        return 'green'
      case 4:
        return 'purple'
      case 5:
        return 'red'
      case 6:
        return 'blue'
    }
  }
}
