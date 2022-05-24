import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FaPlay } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { connect } from 'react-redux';
import { fetchToken } from '../redux/actions';
import namePlayer from '../redux/actions/playerAction';
import '../styles/Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      isButtonDisabled: true,
    };
  }

  validateButton = () => {
    const { name, email } = this.state;
    const regexEmail = /[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z.]*\w$/;
    const isEmailValid = regexEmail.test(email);
    this.setState({ isButtonDisabled: !((isEmailValid && name)) });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateButton);
  }

  handleClickSubmit = async (event) => {
    const { getToken, history, dispatchPlayer } = this.props;
    const { email, name } = this.state;
    event.preventDefault();
    await getToken();
    dispatchPlayer(name, email);
    history.push('/play');
  }

  handleSettingsBtnClick = () => {
    const { history } = this.props;
    history.push('/config');
  }

  render() {
    const { name, email, isButtonDisabled } = this.state;
    return (
      <main className="login-main">
        <form>
          <img className="blink" src="./neon.svg" alt="" />
          <h1>Login</h1>
          <input
            type="text"
            placeholder="Nome"
            name="name"
            value={ name }
            data-testid="input-player-name"
            onChange={ this.handleChange }
            maxLength="30"
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            name="email"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
            maxLength="30"
            required
          />
          <div className="buttons-container">
            <button
              className={ isButtonDisabled ? 'play-btn-disable' : 'play-btn-able' }
              type="submit"
              data-testid="btn-play"
              disabled={ isButtonDisabled }
              onClick={ this.handleClickSubmit }
            >
              <FaPlay className="icon" />
            </button>
            <button
              className="settings-btn"
              type="button"
              data-testid="btn-settings"
              id="setting"
              onClick={ this.handleSettingsBtnClick }
            >
              <FiSettings className="icon" />
            </button>
          </div>
          {/* <button
            className={ isButtonDisabled ? 'play-btn-disable' : 'play-btn-able' }
            type="submit"
            data-testid="btn-play"
            disabled={ isButtonDisabled }
            onClick={ this.handleClickSubmit }
          >
            <FaPlay className="icon" />
            PLAY
          </button>
          <button
            className="settings-btn"
            type="button"
            data-testid="btn-settings"
            id="setting"
            onClick={ this.handleSettingsBtnClick }
          >
            <FiSettings className="icon" />
            SETTINGS
          </button> */}
        </form>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
  dispatchPlayer: (name, gravatar) => dispatch(namePlayer(name, gravatar)),
});

Login.propTypes = {
  getToken: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatchPlayer: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
