const COUNT = 'TABS_COUNT';
const CURRENT = 'TABS_CURRENT';

export class Tabs {
  constructor() {
    this.count = this.count + 1;

    if (!this.current) {
      this.current = this.count - 1;
    }
    import { Tabs } from 'utils/tabs';
  }

  get count() {
    return +window.localStorage.getItem(COUNT);
  }

  set count(num) {
    return +window.localStorage.setItem(COUNT, num);
  }

  get current() {
    return +window.sessionStorage.getItem(CURRENT);
  }

  set current(num) {
    return +window.sessionStorage.setItem(CURRENT, num);
  }
}
