export const getLocalStorage = (item) => {
  if (item) {
    return JSON.parse(window.localStorage.getItem(item));
  }

  return Object.entries(window.localStorage).reduce((ls, [key, value]) => {
    const localStorage = ls;

    try {
      localStorage[key] = JSON.parse(value);
    } catch (err) {
      localStorage[key] = value;
    }

    return localStorage;
  }, {});
};

export const loadToLocalStorage = (item, data) => {
  window.localStorage.setItem(item, JSON.stringify(data));
};

export const removeFromLocalStorage = (item) => {
  window.localStorage.removeItem(item);
};
