import React from 'react';
import PropTypes from 'prop-types';

export const List = ({
  item, handleClick, handleDelete, isActive,
}) => (
  <div className={`list ${isActive ? 'active' : ''}`} onClick={handleClick}>
    <div className="list__name">{item.name}</div>
    <div className="list__buttons">
      <button
        className="list__delete list__button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();

          handleDelete();
        }}
      >
        -
      </button>
      <button className="list__share list__button">s</button>
    </div>
  </div>
);

List.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    public: PropTypes.bool.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};
