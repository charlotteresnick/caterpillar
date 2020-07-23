export default class Snake {
  constructor() {
    this.arr = [];
    // Add additional node to Tail of array, and HEAD of snake
    this.add = (element) => {
      return this.arr.push(element);
    };
    // Remove Head node in array, and TAIL of snake
    this.remove = () => {
      return this.arr.shift()
    };
    this.peek = () => {
      return this.arr[this.arr.length - 1];
    }
    this.size = () => this.arr.length;
    this.contains = (searchPoint) => {
      return this.arr.some((snakePoint) => searchPoint.equals(snakePoint))
    }
    this.print = () => {
      this.arr.forEach((point) => {
        console.log(`[${point.x}, ${point.y}]`)
      })
    }
    this.eatSelf = () => this.arr.slice(0, this.arr.length - 2).some((point) => point.equals(this.peek()))
    // if snake head = point in snake arr x 2
    // end game
    this.reset = () => this.arr = [];
  }
}
