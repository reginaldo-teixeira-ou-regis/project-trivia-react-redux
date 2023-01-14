import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const number = 3;
    const { assertions } = this.props;
    return (
      <div data-testid="feedback-text">
        <h2>Tela de Feedback</h2>
        <Header />
        <h3>
          {
            (assertions < number) ? 'Could be better...' : 'Well Done!'
          }
        </h3>
        <h2>
          <Link
            to="/"
            data-testid="btn-play-again"
          >
            Play Again
          </Link>
        </h2>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.any,
}.isRequired;

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
