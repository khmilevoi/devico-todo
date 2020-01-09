import { createElement } from 'utils/createElement';

export class Component {
  constructor(store, root) {
    this.store = store;
    this.root = root;

    this.init();
    this.render();
  }

  createComponent(name, Comp) {
    const root = createElement('div', { class: name });

    const el = new Comp(this.store, root);

    this.root.append(root);

    return el;
  }

  init() {}

  dispatch(action) {
    return this.store.dispatch(action);
  }

  subscribe(callback) {
    return this.store.subscribe(callback);
  }

  render() {
    throw new Error('render not defined');
  }
}
