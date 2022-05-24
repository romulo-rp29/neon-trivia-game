import he from 'he';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchToken } from '../redux/actions';
import { assertionPlayer, scorePlayer } from '../redux/actions/playerAction';
import '../styles/Game.css';

class Game extends Component {
  countDown = 0;

  timeOut = 0;

  constructor() {
    super();
    this.state = {
      results: [],
      index: 0,
      countdown: 30,
      areAnswersDisabled: false,
      isNextDisabled: true,
    };
  }

  async componentDidMount() {
    const { getToken } = this.props;
    // const millisToThirtySeconds = 30000;
    const result = await this.requestQuestions();
    const requestFailed = 3;
    if (result.response_code === requestFailed) {
      await getToken();
      this.requestQuestions();
    }
    this.countDown = this.createInterval();
    this.timeOut = this.createTimeout();
  }

  handleSelectAnswer = (answer) => {
    const { setScore, setAssertion } = this.props;
    const { results, index } = this.state;
    const { correct_answer: correctAnswer } = results[index];
    document.querySelectorAll('.answer').forEach((item) => {
      item.classList.add('clicked');
    });
    clearInterval(this.countDown);
    this.setState({
      isNextDisabled: false,
      areAnswersDisabled: true,
    });

    if (answer === correctAnswer) { setAssertion(1); }

    return (answer === correctAnswer)
      ? setScore(this.calculateScore())
      : setScore(0);
  }

  handleNextQuestion = () => {
    const { index, results } = this.state;
    const { history } = this.props;

    clearInterval(this.countDown);
    clearTimeout(this.timeOut);
    if (index === results.length - 1) {
      history.push('/feedback');
      return;
    }
    this.setState({
      index: index + 1,
      areAnswersDisabled: false,
      isNextDisabled: true,
      countdown: 30,
    });
    this.countDown = this.createInterval();
    this.timeOut = this.createTimeout();
  }

  requestQuestions = async () => {
    const { token } = this.props;
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const result = await response.json();
    const half = 0.5;
    const questionsList = result.results.map((question) => (
      {
        ...question,
        answers: [...question.incorrect_answers, question.correct_answer]
          .sort(() => Math.random() - half),
      }
    ));
    this.setState({ results: questionsList });
    return result;
  }

  createInterval = () => {
    const millisToSecond = 1000;
    return setInterval(() => {
      const { countdown } = this.state;
      if (countdown === 1) clearInterval(this.countDown);
      this.setState((prevState) => ({ countdown: prevState.countdown - 1 }));
    }, millisToSecond);
  }

  createTimeout = () => {
    const millisToThirtySeconds = 30000;
    return setTimeout(() => {
      this.setState({
        areAnswersDisabled: true,
        isNextDisabled: false,
      });
    }, millisToThirtySeconds);
  }

  calculateScore = () => {
    const { results, index, countdown } = this.state;
    let multiplier = 1;
    const hardMultiplier = 3;
    const mediumMultiplier = 2;
    const basePoints = 10;

    if (results[index].difficulty === 'hard') multiplier = hardMultiplier;
    if (results[index].difficulty === 'medium') multiplier = mediumMultiplier;

    return (basePoints + (countdown * multiplier));
  };

  renderQuestions = () => {
    const { results, index, areAnswersDisabled, isNextDisabled } = this.state;
    const { category, question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswer, answers } = results[index];

    return (
      <div className="game-container">
        <h2 data-testid="question-category">{category}</h2>
        <p data-testid="question-text">{he.decode(question)}</p>
        <div data-testid="answer-options" className="answers-list">
          {answers.map((answer) => (
            <button
              type="button"
              key={ answer }
              disabled={ areAnswersDisabled }
              onClick={ () => this.handleSelectAnswer(answer) }
              className={ answer === correctAnswer
                ? 'answer correct'
                : 'answer wrong' }
              data-testid={ answer === correctAnswer
                ? 'correct-answer'
                : `wrong-answer-${incorrectAnswer.indexOf(answer)}` }
            >
              {he.decode(answer)}
            </button>
          ))}
        </div>
        {/* <br /> */}
        {
          !isNextDisabled && (
            <button
              type="button"
              data-testid="btn-next"
              className="btn-next"
              onClick={ this.handleNextQuestion }
            >
              Next
            </button>
          )
        }
      </div>
    );
  };

  render() {
    const { results, countdown } = this.state;

    return (
      <div>
        <Header timer={ countdown } />
        {results.length
          ? this.renderQuestions()
          : ''}
      </div>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
  getToken: PropTypes.func.isRequired,
  setScore: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  setAssertion: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
  setScore: (score) => dispatch(scorePlayer(score)),
  setAssertion: (hit) => dispatch(assertionPlayer(hit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
