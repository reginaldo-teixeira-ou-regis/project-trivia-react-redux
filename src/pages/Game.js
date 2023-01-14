import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import fetchQuestion from '../service/fetchQuestion';
import Button from '../components/ButtonAnswers';

const tokenInvalid = 3;
const numberFour = 4;

class Game extends Component {
  state = {
    questionsGame: [],
    indexQuestion: 0,
    answersGame: [],
    answerCorrect: '',
    answersWrong: '',
    timer: 30,
    intervalTimeId: '',
    next: '',
    answeredQuestions: false,
  };

  async componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const apiQuestion = await fetchQuestion(token);
    if (apiQuestion.response_code === tokenInvalid) {
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

  buttonColor = () => {
    this.setState({
      answerCorrect: 'greenColor',
      answersWrong: 'redColor',
      next: true,
      answeredQuestions: true,
    });
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
    const { timer, intervalTimeId } = this.state;
    const intervalTime = 1000;

    if (intervalTimeId) {
      this.setState({ timer: 30, intervalTimeId: '' });
    }

    if (timer === 0) {
      this.setState({ timer: 30, intervalTimeId: '' });
    }

    const timerCount = setInterval(() => {
      this.setState((prevState) => ({
        ...prevState,
        timer: prevState.timer - 1,
        intervalTimeId: timerCount,
      }));
    }, intervalTime);
  };

  handleCountTime = () => {
    const { timer } = this.state;
    const timeLimit = 0;
    if (timer === timeLimit) return true;
  };

  endTimer = () => {
    const { intervalTimeId } = this.state;
    clearInterval(intervalTimeId);
  };

  buttonNext = () => {
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
        this.countingTimeStart(),
      );
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Game);
