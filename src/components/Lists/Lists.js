import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dux/connect';

import { getLists, add, setActive } from 'store/actions/list';
import { List } from './List';

const Lists = ({
  getLists,
  add,
  token,
  personal,
  shared,
  setActive,
  active,
}) => {
  const [name, setName] = useState('');

  useEffect(() => {
    getLists(token);
  }, [token]);

  const selectActive = (event, item) => {
    event.preventDefault();

    if (active !== item.id) {
      setActive(item.id);
    }
  };

  return (
    <div className="lists">
      <form
        className="lists__add"
        onSubmit={(event) => {
          event.preventDefault();

          if (name.trim() !== '') {
            add(name, token);
            setName('');
          }
        }}
      >
        <label className="lists__add-label" htmlFor="lists-add-input">
          <button className="lists__add-button" type="submit">
            +
          </button>
        </label>
        <input
          className="lists__add-input"
          id="lists-add-input"
          type="text"
          placeholder="New list"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </form>
      <div className="personal section">
        <div className="section__title">Personal</div>
        <div className="section__list">
          {personal.map((item) => (
            <List
              key={item.id}
              item={item}
              isActive={item.id === active}
              handleClick={(event) => selectActive(event, item)}
            ></List>
          ))}
        </div>
      </div>
      <div className="shared section">
        <div className="section__title">Shared</div>
        <div className="section__list">
          {shared.map((item) => (
            <List
              key={item.id}
              item={item}
              isActive={item.id === active}
              handleClick={(event) => selectActive(event, item)}
            ></List>
          ))}
        </div>
      </div>
    </div>
  );
};

Lists.propTypes = {
  getLists: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  personal: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  shared: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  setActive: PropTypes.func.isRequired,
  active: PropTypes.string,
};

const mapStateToProps = (state) => ({
  token: state.auth.user.token,
  personal: state.lists.personal,
  shared: state.lists.shared,
  active: state.lists.active,
});

const mapDispatchToProps = {
  getLists,
  add,
  setActive,
};

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
