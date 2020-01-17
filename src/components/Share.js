import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'dux/connect';

import { getUserList, deleteList } from 'store/actions/share';

import { useDeBounce } from 'utils/deBounce';
import { share } from 'store/actions/list';

const Share = ({
  getUserList, deleteList, list, users, share, token,
}) => {
  const getUserListSlowed = useDeBounce(getUserList, 300);

  return (
    <div className="share">
      <div className="share__modal">
        <h2 className="share__title">Share</h2>
        <input
          type="text"
          className="share__input"
          placeholder="type login of user..."
          onChange={(event) => {
            const login = event.target.value;
            getUserListSlowed(login);
          }}
        />
        <div className="share__names"></div>
        <div className="share__users">
          {users.map((user) => (
            <div
              className="share__user"
              key={user._id}
              onClick={(event) => {
                event.preventDefault();

                share(list, user._id, token);
                deleteList();
              }}
            >
              {user.login}
            </div>
          ))}
        </div>
        <div className="share__buttons">
          <button
            className="share__button share__button-close"
            onClick={(event) => {
              event.preventDefault();

              deleteList();
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

Share.propTypes = {
  getUserList: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
  list: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
  share: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.share.users,
  list: state.share.list,
  token: state.auth.user.token,
});

const mapDispatchToProps = {
  getUserList,
  deleteList,
  share,
};

export default connect(mapStateToProps, mapDispatchToProps)(Share);
