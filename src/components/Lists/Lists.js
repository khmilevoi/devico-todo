import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dux/connect';

import {
  getLists, add, setActive, del, toggle,
} from 'store/actions/list';
import { setList } from 'store/actions/share';

import { ACTIVE_ITEM } from 'constants/localStorage';

import { List } from './List';

const Lists = ({
  getLists,
  add,
  del,
  toggle,
  token,
  personal,
  shared,
  setActive,
  setList,
  active,
  userId,
}) => {
  const [name, setName] = useState('');

  const [personalCollapsed, togglePersonal] = useState(false);
  const [sharedCollapsed, toggleShare] = useState(false);

  useEffect(() => {
    getLists(token);

    // const active = window.localStorage.getItem(ACTIVE_ITEM) || null;

    // if (active) {
    //   let item = personal.find((item) => item.id === active);
    //   item = item || shared.find((item) => item.id === active);

    //   if (item) {
    //     setActive(item);
    //   }
    // }
  }, [token]);

  const selectActive = (event, item) => {
    event.preventDefault();

    if (active !== item.id) {
      setActive(item);
    }
  };

  const drawList = (list) => list.map((item) => (
      <List
        key={item.id}
        item={item}
        isActive={item.id === active.id}
        handleClick={(event) => selectActive(event, item)}
        handleDelete={() => del(item.id, token)}
        handleToggle={() => toggle(item.id, token)}
        handleShare={() => setList(item.id)}
        isCreator={userId === item.creator}
      ></List>
  ));

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
      <div className="sections-wrapper">
        <div className="personal section">
          <div
            className="section__title"
            onClick={() => togglePersonal(!personalCollapsed)}
          >
            Personal <i>{personalCollapsed ? '+' : '-'}</i>
          </div>
          <div
            className={`section__list ${personalCollapsed ? 'collapsed' : ''}`}
          >
            {drawList(personal)}
          </div>
        </div>
        <div className="shared section">
          <div
            className={'section__title'}
            onClick={() => toggleShare(!sharedCollapsed)}
          >
            Shared <i>{sharedCollapsed ? '+' : '-'}</i>
          </div>
          <div
            className={`section__list ${sharedCollapsed ? 'collapsed' : ''}`}
          >
            {drawList(shared)}
          </div>
        </div>
      </div>
    </div>
  );
};

Lists.propTypes = {
  getLists: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  del: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  personal: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  shared: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  setActive: PropTypes.func.isRequired,
  setList: PropTypes.func.isRequired,
  active: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  userId: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.auth.user.token,
  personal: state.lists.personal,
  shared: state.lists.shared,
  active: state.lists.active || {},
  userId: state.auth.user.id,
});

const mapDispatchToProps = {
  getLists,
  add,
  del,
  toggle,
  setList,
  setActive,
};

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
