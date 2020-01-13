// @flow
/* eslint-disable no-use-before-define */

import type { CreateElement } from 'types/shared';
import type {
  Store, Subscribe, Dispatch, State,
} from 'types/dux';

import { entries } from 'utils/entries';

export const createElement: CreateElement = (
  type = 'div',
  props = {},
  childrens = [],
) => {
  const element: HTMLElement = document.createElement(type);

  entries(props).forEach(([name, value]) => {
    if (name === 'style' && typeof value === 'object') {
      entries(value).forEach(([prop, val]) => {
        element.style[prop] = val;
      });
    } else if (typeof value === 'string') {
      const attr = document.createAttribute(name);

      attr.value = value;

      element.setAttributeNode(attr);
    }
  });

  childrens.forEach((children) => {
    if (children instanceof HTMLElement) {
      element.append(children);
    } else if (
      typeof children === 'string'
      && typeof element.innerText !== 'undefined'
    ) {
      element.innerText += children;
    }
  });

  return element;
};

export const mount = (component: Component): HTMLElement => {
  const element = component.render();
  component.mounted();

  return element;
};

export class Component {
  store: Store;

  constructor(store: Store) {
    this.store = store;

    this.init();
  }

  createComponent(Comp: (Store, ...any[]) => Component, ...props: any[]) {
    const component: Component = new Comp(this.store, ...props);

    const element = mount(component);

    return element;
  }

  init() {}

  mounted() {}

  dispatch: Dispatch = (action) => this.store.dispatch(action);

  subscribe: Subscribe = (callback) => this.store.subscribe(callback);

  getState(): State {
    return this.store.getState();
  }

  render(): HTMLElement {
    throw new Error('render not defined');
  }
}
