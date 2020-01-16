import React from 'react';
import PropTypes from 'prop-types';

export const List = ({ item, handleClick, isActive }) => (
  <div className={`list ${isActive ? 'active' : ''}`} onClick={handleClick}>
    <div className="list__name">{item.name}</div>
  </div>
);

List.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    public: PropTypes.bool.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};
