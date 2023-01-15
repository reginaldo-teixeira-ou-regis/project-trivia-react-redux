import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { testId, btnGeneric, isDisabled, handleButton, btnCss } = this.props;
    return (
      <button
        type="button"
        data-testid={ testId }
        disabled={ isDisabled }
        onClick={ handleButton }
        className={ btnCss }
        id={ testId }
      >
        {btnGeneric}
      </button>
    );
  }
}

Button.propTypes = {
  testId: PropTypes.string.isRequired,
  btnGeneric: PropTypes.string.isRequired,
  handleButton: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  btnCss: PropTypes.string.isRequired,
};

Button.defaultProps = {
  isDisabled: false,
};

export default Button;
