export default class Snake {
  constructor() {
    this.arr = [];
    this.add = (element) => {
      return this.arr.push(element);
    };
    this.remove = () => {
      return this.arr.shift()
    };
    this.peek = () => {
      return this.arr[0];
    }
    this.length = () => this.arr.length;
    this.contains = (searchPoint) => {
      return this.arr.some((snakePoint) => searchPoint.equals(snakePoint))
    }
  }
}
