import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const StoreContext = React.createContext();

export const Provider = ({ store, children }) => (
  <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
);

Provider.propTypes = {
  store: PropTypes.shape({
    getState: PropTypes.func,
    dispatch: PropTypes.func,
    subscribe: PropTypes.func,
  }).isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

export const useForceUpdate = () => {
  const [, update] = useState({});
  return () => update({});
};

export const connect = (
  mapStateToProps,
  mapDispatchToProps,
) => (Component) => (props) => {
  const store = useContext(StoreContext);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const unsubscribe = store.subscribe(() => forceUpdate());
    return () => unsubscribe();
  }, []);

  return (
    <Component
      {...props}
      {...mapStateToProps(store.getState())}
      {...Object.entries(mapDispatchToProps).reduce((prev, [name, action]) => {
        const actions = { ...prev };

        actions[name] = (...args) => store.dispatch(action(...args));

        return actions;
      }, {})}
    ></Component>
  );
};
