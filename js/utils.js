const idGenerator = (() => {
  let currentId = 0;

  return () => currentId++;
})();
