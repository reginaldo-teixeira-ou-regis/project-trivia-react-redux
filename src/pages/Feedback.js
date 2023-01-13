import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
