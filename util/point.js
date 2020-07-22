export default class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.equals = (point) => {
      return this.x === point.x && this.y === point.y
    }

    // Determine: min <= point < max
    this.inBounds = (minX, maxX, minY, maxY) => {
      return !(this.x < minX || this.x >= maxX || this.y < minY || this.y >= maxY);
    }
  }
}
