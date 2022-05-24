import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Header.css';

class Header extends Component {
  render() {
    const { name, email, score, timer } = this.props;
    return (
      <header>
        <div className="header-player">
          <img
            data-testid="header-profile-picture"
            className="img-gravatar"
            alt="avatar"
            src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
          />
          <div className="player-info">
            <h1 data-testid="header-player-name" className="name">{`Player: ${name}`}</h1>
            <h2 data-testid="header-score" className="score">{`Score: ${score}`}</h2>
          </div>
        </div>
        {timer > 0 && <p className="timer">{timer}</p>}
        <div className="header-logo">
          <img src="./neon.svg" alt="" />
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

Header.defaultProps = {
  name: '',
  email: '',
  score: 0,
  timer: 0,
};

Header.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  score: PropTypes.number,
  timer: PropTypes.number,
};

export default connect(mapStateToProps, null)(Header);
