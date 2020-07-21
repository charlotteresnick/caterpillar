export default class Queue {
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
  }
}
