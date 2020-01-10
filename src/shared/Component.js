export const createElement = (type = 'div', props = {}, childrens = []) => {
  const element = document.createElement(type);

  Object.entries(props).forEach(([name, value]) => {
    if (name === 'style') {
      Object.entries(value).forEach(([prop, val]) => {
        element.style[prop] = val;
      });
    } else {
      const attr = document.createAttribute(name);

      attr.value = value;

      element.setAttributeNode(attr);
    }
  });

  childrens.forEach((children) => {
    if (children instanceof HTMLElement) {
      element.append(children);
    } else {
      element.innerText += children;
    }
  });

  return element;
};

export const mount = (component) => {
  const element = component.render();
  component.mounted();

  return element;
};

export class Component {
  constructor(store) {
    this.store = store;

    this.init();
  }

  createComponent(Comp, ...props) {
    const component = new Comp(this.store, ...props);

    const element = mount(component);

    return element;
  }

  init() {}

  mounted() {}

  dispatch(action) {
    return this.store.dispatch(action);
  }

  subscribe(callback) {
    return this.store.subscribe(callback);
  }

  getState() {
    return this.store.getState();
  }

  render() {
    throw new Error('render not defined');
  }
}
