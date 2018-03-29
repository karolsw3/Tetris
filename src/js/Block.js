/**
 * (Paweł)
 * Block game element schema
*/
class Block {
  constructor (param) {
    // Generate Locations
    this.x = (
      param.loc.x || (function () {
        console.warn("Location x isn't defined")
        return undefined
      })()
    )
    this.x = (
      param.loc.y || (function () {
        console.warn("Location y isn't defined")
        return undefined
      })()
    )
    // Generate number from range ( 0 - 6 ) - 7 elements
    this.type = Math.round(Math.random() * 6)
  }
}
export default Block
