import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  state = {
    img: '',
  };

  componentDidMount() {
    this.setState({ img: this.getImg() });
  }

  getImg = () => {
    const { email } = this.props;
    const hash = md5(email).toString();
    return `https://www.gravatar.com/avatar/${hash}`;
  };

  render() {
    const { img } = this.state;
    const { name, score } = this.props;
    console.log(this.props);
    return (
      <header>
        <div>
          {' '}
          <img
            data-testid="header-profile-picture"
            src={ img }
            alt=""
          />

        </div>

        <h2 data-testid="header-player-name">
          { name }
        </h2>
        <h2>Score:</h2>
        <p data-testid="header-score">{score}</p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.any,
  name: PropTypes.any,
  score: PropTypes.any,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
