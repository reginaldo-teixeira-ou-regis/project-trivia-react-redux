import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import '../style/Header.css';
import { AiFillStar } from 'react-icons/ai';

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
    return (
      <main className="main-header">
        <header className="header-header">
          <div className="img-player">
            <div>
              <img
                data-testid="header-profile-picture"
                src={ img }
                alt=""
                className="image"
              />
            </div>
            <div>
              <h2
                data-testid="header-player-name"
                className="player-name"
              >
                { name }
              </h2>
            </div>
          </div>
          <div className="scoreboard">
            <AiFillStar className="star" />
            <span className="header-score">
              <span data-testid="header-score">
                Score:
                {' '}
                {score}
              </span>
            </span>
          </div>
        </header>
      </main>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
  score: state.player.score,
});

Header.defaultProps = {
  name: '',
  gravatarEmail: '',
  score: 0,
};

export default connect(mapStateToProps)(Header);
