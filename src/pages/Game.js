import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import fetchQuestion from '../service/fetchQuestion';
import Button from '../components/ButtonAnswers';

const tokenInvalid = 3;

class Game extends Component {
  state = {
    questionsGame: [],
    indexQuestion: 0,
    answersGame: [],
  };

  async componentDidUpdate() {
    const { history } = this.props;
    const apiQuestion = await fetchQuestion();
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
    }
  }

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

  render() {
    const { questionsGame, indexQuestion, answersGame, correctAnswer } = this.state;

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
              <section data-testid="answer-options">
                {answersGame.map((element, index) => (
                  <Button
                    key={ element }
                    btnOptionsAnswers={ element }
                    testId={
                      element === correctAnswer
                        ? 'correct-answer'
                        : `wrong-answer-${index}`
                    }
                    // onClick={}
                  />
                ))}
              </section>
            </>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
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

//
