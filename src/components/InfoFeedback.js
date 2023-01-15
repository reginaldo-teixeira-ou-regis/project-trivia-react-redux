import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class InfoFeedback extends Component {
  render() {
    const { score, assertions } = this.props;
    return (
      <main>
        <section>
          <span data-testid="feedback-total-score">
            { score }
          </span>
        </section>
        <section>
          <span data-testid="feedback-total-question">
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
