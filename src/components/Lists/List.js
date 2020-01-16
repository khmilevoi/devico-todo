import React from 'react';
import PropTypes from 'prop-types';

import { DeleteIcon, ShareIcon } from 'shared/icons';

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
        <DeleteIcon></DeleteIcon>
      </button>
      <button className="list__share list__button">
        <ShareIcon></ShareIcon>
      </button>
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
