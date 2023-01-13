import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { testId, btnOptionsAnswers, isDisabled, handleButton } = this.props;
    return (
      <button
        type="button"
        data-testid={ testId }
        disabled={ isDisabled }
        onClick={ handleButton }
      >
        {btnOptionsAnswers}
      </button>
    );
  }
}

Button.propTypes = {
  testId: PropTypes.string.isRequired,
  btnOptionsAnswers: PropTypes.string.isRequired,
  handleButton: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};

Button.defaultProps = {
  isDisabled: false,
};

export default Button;
