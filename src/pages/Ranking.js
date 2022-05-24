import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FaPlay } from 'react-icons/fa';
import '../styles/Ranking.css';

class Ranking extends Component {
  ranking = JSON.parse(localStorage.getItem('ranking')) || [];

  render() {
    const { history } = this.props;
    return (
      <div className="ranking-container">
        <div className="ranking-header">
          <img src="./neon.svg" alt="" />
          <h1 data-testid="ranking-title">Ranking</h1>
        </div>
        {this.ranking.sort((a, b) => b.score - a.score).map((user, index) => (
          <div className="ranking-card" key={ index }>
            <div className="ranking-user">
              <img src={ user.picture } alt="" className="img-gravatar" />
              <h4
                data-testid={ `player-name-${index}` }
                className="ranking-name"
              >
                { user.name }
              </h4>
            </div>
            <p
              data-testid={ `player-score-${index}` }
              className="ranking-score"
            >
              { user.score }
            </p>
          </div>
        ))}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
          className="play-again-btn"
        >
          <FaPlay />
          Play
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Ranking;
