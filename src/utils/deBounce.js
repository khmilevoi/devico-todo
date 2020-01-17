export const useDeBounce = (() => {
  let func = null;
  let id = null;

  return (newFunc, timeOut) => {
    func = func || newFunc;

    return (...args) => {
      if (id) {
        clearInterval(id);
      }

      id = setTimeout(() => func(...args), timeOut);
    };
  };
})();
