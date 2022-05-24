import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FaListOl, FaPlay } from 'react-icons/fa';
import { connect } from 'react-redux';
import Header from '../components/Header';
import '../styles/Feedback.css';

class Feedback extends Component {
  componentDidMount() {
    const { player: { name, score, gravatarEmail } } = this.props;
    if (!name) return;
    const picture = `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}`;
    const newUser = {
      name,
      score,
      picture,
    };
    const rankingList = JSON.parse(localStorage.getItem('ranking')) || [];
    localStorage.setItem('ranking', JSON.stringify([...rankingList, newUser]));
  }

  handleRouteBtnClick = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { assertion, score, history } = this.props;
    const hit = 3;
    return (
      <>
        <Header />
        <div className="feedback-container">
          {
            assertion >= hit
              ? (
                <p data-testid="feedback-text" className="feedback-text">
                  Well Done!
                </p>
              )
              : (
                <p data-testid="feedback-text" className="feedback-text">
                  Could be better...
                </p>
              )
          }
          <p
            data-testid="feedback-total-score"
            className="feedback-data"
          >
            {`Score: ${score}`}

          </p>
          <p
            data-testid="feedback-total-question"
            className="feedback-data"
          >
            {`Assertions: ${assertion}`}

          </p>
          <div className="feedback-btns">
            <button
              data-testid="btn-play-again"
              className="play-again-btn"
              type="button"
              onClick={ this.handleRouteBtnClick }
            >
              <FaPlay />
              Play Again
              <span />
            </button>
            <button
              data-testid="btn-ranking"
              className="ranking-btn"
              type="button"
              onClick={ () => history.push('/ranking') }
            >
              <FaListOl />
              Ranking
              <span />
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertion: state.player.assertions,
  player: state.player,
  score: state.player.score,
});

Feedback.propTypes = {
  assertion: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  player: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Feedback);
