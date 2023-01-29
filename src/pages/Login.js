import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../image/trivia.png';
import { saveLogin } from '../redux/actions';
import fetchToken from '../service/fetchToken';
import '../style/Login.css';
import exclamationGreen from '../image/exclamation-green.svg';
import exclamationBlue from '../image/exclamation-blue.svg';
import exclamationOrange from '../image/exclamation-orange.svg';
import exclamationPink from '../image/exclamation-pink.svg';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    disabled: false,
  };

  handleInput = (event) => {
    const { id, value } = event.target;
    this.setState({
      [id]: value,
    }, () => {
      const { email, name } = this.state;
      this.setState({
        disabled: (email.length > 0 && name.length > 0),
      });
    });
  };

  handleSubmit = () => {
    const { dispatch, history } = this.props;
    const { dataToken, name, email } = this.state;
    dispatch(saveLogin({ dataToken, name, email }));
    localStorage.setItem('token', dataToken.token);
    history.push('/game');
  };

  getToken = async () => {
    const dataToken = await fetchToken();
    this.setState({
      dataToken,
    }, this.handleSubmit);
  };

  render() {
    const { name, email, disabled } = this.state;
    return (
      <main className="pageLogin">
        <img src={ logo } className="App-logo" alt="logo" data-testid="logo-trivia" />
        <img src={ exclamationGreen } className="exclamationGreen" alt="?-green" />
        <img src={ exclamationBlue } className="exclamationBlue" alt="?-blue" />
        <img src={ exclamationOrange } className="exclamationOrange" alt="?-orange" />
        <img src={ exclamationPink } className="exclamationPink" alt="?-pink" />
        <header className="App-header container-login">
          <form className="formLogin">
            <label htmlFor="name">
              <input
                type="name"
                id="name"
                value={ name }
                data-testid="input-player-name"
                onChange={ this.handleInput }
                placeholder="Type your name"
              />
            </label>
            <label htmlFor="email">
              <input
                type="email"
                id="email"
                value={ email }
                data-testid="input-gravatar-email"
                onChange={ this.handleInput }
                placeholder="Type your email"
              />
            </label>
            <button
              type="button"
              data-testid="btn-play"
              disabled={ !disabled }
              onClick={ this.getToken }
            >
              Play
            </button>
            <Link to="/settings">
              <button
                type="button"
                data-testid="btn-settings"
              >
                Settings
              </button>
            </Link>
          </form>
        </header>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.players,
});

export default connect(mapStateToProps)(Login);
