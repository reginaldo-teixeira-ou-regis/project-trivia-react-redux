import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TfiAlarmClock } from 'react-icons/tfi';
import Header from '../components/Header';
import fetchQuestion from '../service/fetchQuestion';
import Button from '../components/ButtonGeneric';
import { addScore } from '../redux/actions';
import { setRankingLocalStorage } from '../service/saveRanking';
import '../style/Game.css';
import logoTrivia from '../image/logo trivia.svg';
import exclamationGreen from '../image/exclamation-green.svg';
import exclamationBlue from '../image/exclamation-blue.svg';
import exclamationOrange from '../image/exclamation-orange.svg';
import exclamationPink from '../image/exclamation-pink.svg';

const numberOne = 1;
const numberTwo = 2;
const numberThree = 3;
const numberFour = 4;
const numberTen = 10;

const correctAnswerId = 'correct-answer';

class Game extends Component {
  state = {
    questionsGame: [],
    indexQuestion: 0,
    answersGame: [],
    answerCorrect: '',
    answersWrong: '',
    timer: 30,
    next: '',
  };

  async componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const apiQuestion = await fetchQuestion(token);
    if (apiQuestion.response_code === numberThree) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState(
        {
          questionsGame: apiQuestion.results,
        },
        this.handleQuestion,
      );
      this.countingTimeStart();
    }
  }

  componentDidUpdate() {
    const { timer } = this.state;
    if (timer === 0) this.endTimer();
  }

  buttonColor = ({ target }) => {
    const { dispatch } = this.props;
    const { timer, indexQuestion, questionsGame } = this.state;
    let equalDifficulty = 0;

    this.setState({ answerCorrect: 'greenColor', answersWrong: 'redColor', next: true });

    if (target.id === correctAnswerId) {
      if (questionsGame[indexQuestion].difficulty === 'easy') {
        equalDifficulty = numberOne;
      }
      if (questionsGame[indexQuestion].difficulty === 'medium') {
        equalDifficulty = numberTwo;
      }
      if (questionsGame[indexQuestion].difficulty === 'hard') {
        equalDifficulty = numberThree;
      }
      dispatch(addScore((numberTen + (timer * equalDifficulty))));
    }

    this.endTimer();
  };

  arrayQuestion = (array) => {
    const newArray = [];
    array.forEach((question) => {
      newArray.splice(Math.floor(Math.random() * array.length), 0, question);
    });
    return newArray;
  };

  handleQuestion = () => {
    const { questionsGame, indexQuestion } = this.state;
    if (questionsGame.length > 0) {
      const answersGame = this.arrayQuestion([
        questionsGame[indexQuestion].correct_answer,
        ...questionsGame[indexQuestion].incorrect_answers,
      ]);
      this.setState({
        answersGame,
        correctAnswer: questionsGame[indexQuestion].correct_answer,
      });
    }
  };

  countingTimeStart = () => {
    const { timer } = this.state;
    const intervalTime = 1000;

    if (this.timerCount) {
      this.setState({ timer: 30 });
    }

    if (timer === 0) {
      this.setState({ timer: 30 });
      console.log('qualquer coisa');
    }

    this.timerCount = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, intervalTime);
  };

  handleCountTime = () => {
    const { timer } = this.state;
    const timeLimit = 0;
    if (timer === timeLimit) return true;
  };

  endTimer = () => {
    clearInterval(this.timerCount);
  };

  buttonNext = () => {
    const { name, score, email } = this.props;
    this.endTimer();
    const { indexQuestion } = this.state;
    if (indexQuestion < numberFour) {
      this.setState(
        (prevState) => ({
          next: false,
          indexQuestion: prevState.indexQuestion + 1,
          answerCorrect: '',
          answersWrong: '',
        }),
        this.handleQuestion,
      );
      this.countingTimeStart();
    } else {
      const { history } = this.props;
      setRankingLocalStorage({ name, score, email });
      history.push('/feedback');
    }
  };

  render() {
    const {
      questionsGame, indexQuestion, answersGame, correctAnswer,
      answerCorrect, answersWrong, timer, next } = this.state;

    return (
      <main className="main-game">
        <img src={ logoTrivia } className="logo-trivia" alt="logo-trivia" />
        <img src={ exclamationGreen } className="exclamation-green" alt="?-green" />
        <img src={ exclamationBlue } className="exclamation-blue" alt="?-blue" />
        <img src={ exclamationOrange } className="exclamation-orange" alt="?-orange" />
        <img src={ exclamationPink } className="exclamation-pink" alt="?-pink" />
        <header className="header-game">
          <Header />
          <div className="container">
            {questionsGame.length > 0 ? (
              <>
                <div className="category">
                  <h2 data-testid="question-category">
                    {questionsGame[indexQuestion].category}
                  </h2>
                  <h3 data-testid="question-text">
                    {questionsGame[indexQuestion].question}
                  </h3>
                  <div className="timer-time">
                    <TfiAlarmClock className="clock" />
                    <span>Tempo:</span>
                    <span className="game-timer" data-testId="game-timer">
                      {timer}
                    </span>
                  </div>
                </div>
                <section data-testid="answer-options" className="options">
                  {answersGame.map((element, index) => (
                    <Button
                      key={ element }
                      btnGeneric={ element }
                      testId={
                        element === correctAnswer
                          ? 'correct-answer'
                          : `wrong-answer-${index}`
                      }
                      handleButton={ this.buttonColor }
                      btnCss={
                        `btn-answers
                        ${element === correctAnswer ? answerCorrect : answersWrong}`
                      }
                      isDisabled={ this.handleCountTime() }
                    />
                  ))}
                </section>
              </>
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
          {next || timer === 0 ? (
            <Button
              btnCss="btn-next"
              testId="btn-next"
              disabled={ false }
              btnGeneric="Next"
              handleButton={ this.buttonNext }
            />
          ) : (
            ''
          )}
        </header>
      </main>
    );
  }
}

const mapStateToProps = (globalState) => ({
  ...globalState,
  name: globalState.player.name,
  score: globalState.player.score,
  email: globalState.player.email,
});

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  email: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Game);
