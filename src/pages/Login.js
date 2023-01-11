import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import { saveLogin } from '../redux/actions';
import fetchToken from '../service/fetchToken';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    disabled: false,
  };

  /* componentDidUpdate() {
    this.getToken();
  } */

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
    const { dataToken } = this.state;
    dispatch(saveLogin(dataToken));
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
      <main>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
          <form>
            <label htmlFor="name">
              Name
              <input
                type="name"
                id="name"
                value={ name }
                data-testid="input-player-name"
                onChange={ this.handleInput }
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                type="email"
                id="email"
                value={ email }
                data-testid="input-gravatar-email"
                onChange={ this.handleInput }
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
