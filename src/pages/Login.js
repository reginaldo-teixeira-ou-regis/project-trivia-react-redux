import React from 'react';
import logo from '../trivia.png';

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
    console.log();
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
              onClick={ this.handleSubmit }
            >
              Play
            </button>
          </form>
        </header>
      </main>
    );
  }
}

export default Login;
