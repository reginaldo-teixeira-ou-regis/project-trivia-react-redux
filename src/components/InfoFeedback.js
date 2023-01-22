import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../style/InfoFeedback.css';

class InfoFeedback extends Component {
  render() {
    const { score, assertions } = this.props;
    return (
      <main className="assertions">
        <section>
          <h4>Total of</h4>
          <span
            data-testid="feedback-total-score"
            className="score-feedback"
          >
            { score }
          </span>
        </section>
        <br />
        <section>
          <h4>Total of assertions</h4>
          <span
            data-testid="feedback-total-question"
            className="assertions-feedback"
          >
            { assertions }
          </span>
        </section>
      </main>
    );
  }
}

const mapStateToProps = (globalState) => ({
  score: globalState.player.score,
  assertions: globalState.player.assertions,
});

InfoFeedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(InfoFeedback);
