import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import InfoFeedback from '../components/InfoFeedback';
import { resetScore } from '../redux/actions';

const numberThree = 3;
class Feedback extends Component {
  render() {
    const { assertions, dispatch } = this.props;
    return (
      <div>
        <Header />
        <h2>Tela de Feedback</h2>
        <h3 data-testid="feedback-text">
          {
            assertions < numberThree ? 'Could be better...' : 'Well Done!'
          }
        </h3>
        <InfoFeedback />
        <button
          type="submit"
          onClick={ () => { dispatch(resetScore()); } }
        >
          <Link
            to="/"
            data-testid="btn-play-again"
          >
            PLAY AGAIN
          </Link>
        </button>
        <button
          type="submit"
        >
          <Link
            to="/ranking"
            data-testid="btn-ranking"
          >
            RANKING
          </Link>
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
