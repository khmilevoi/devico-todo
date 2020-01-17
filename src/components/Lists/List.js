import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from 'react-simple-checkbox';

import { DeleteIcon, ShareIcon } from 'shared/icons';

export const List = ({
  item,
  handleClick,
  handleDelete,
  handleToggle,
  handleShare,
  isActive,
  isCreator,
}) => (
  <div className={`list ${isActive ? 'active' : ''}`} onClick={handleClick}>
    <div className="list__name">{item.name}</div>
    <div
      className={`list__buttons ${isCreator ? '' : 'disable'}`}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <Checkbox
        className="list__button"
        tickAnimationDuration={200}
        size={2.5}
        checked={item.isPublic}
        onChange={handleToggle}
      ></Checkbox>
      <button className="list__delete list__button" onClick={handleDelete}>
        <DeleteIcon></DeleteIcon>
      </button>
      <button className="list__share list__button" onClick={handleShare}>
        <ShareIcon></ShareIcon>
      </button>
    </div>
  </div>
);

List.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    isPublic: PropTypes.bool.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleShare: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  isCreator: PropTypes.bool.isRequired,
};
