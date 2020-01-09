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
    if (typeof children === 'object') {
      element.append(children);
    } else {
      element.append(children);
    }
  });

  return element;
};
