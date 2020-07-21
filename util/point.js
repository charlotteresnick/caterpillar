export default class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.equals = (point) => {
      return this.x === point.x && this.y === point.y
    }
  }
}
