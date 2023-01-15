import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import fetchQuestion from '../service/fetchQuestion';
import Button from '../components/ButtonGeneric';
import { addScore } from '../redux/actions';

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
    console.log(target.id, correctAnswerId);

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
      history.push('/feedback');
    }
  };

  render() {
    const {
      questionsGame,
      indexQuestion,
      answersGame,
      correctAnswer,
      answerCorrect,
      answersWrong,
      timer,
      next,
    } = this.state;

    return (
      <main>
        <Header />
        <div>
          {questionsGame.length > 0 ? (
            <>
              <h3 data-testid="question-category">
                {questionsGame[indexQuestion].category}
              </h3>
              <h3 data-testid="question-text">
                {questionsGame[indexQuestion].question}
              </h3>
              {timer}
              <section data-testid="answer-options">
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
                      element === correctAnswer ? answerCorrect : answersWrong
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
        {next ? (
          <Button
            testId="btn-next"
            disabled={ false }
            btnGeneric="Next"
            handleButton={ this.buttonNext }
          />
        ) : (
          ''
        )}
      </main>
    );
  }
}

const mapStateToProps = (globalState) => ({
  ...globalState,
});

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Game);
