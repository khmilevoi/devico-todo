export class Interval {
  constructor() {
    this.intervals = {};
  }

  add(event, callback, ms) {
    if (!this.intervals[event]) {
      this.intervals[event] = setInterval(callback, ms);
    }
  }

  clear(event) {
    clearInterval(this.intervals[event]);
    delete this.intervals[event];
  }
}
