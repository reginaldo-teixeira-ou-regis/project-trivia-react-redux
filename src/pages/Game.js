import React, { Component } from 'react';
import Header from '../components/Header';

class Game extends Component {
  render() {
    return (
      <main>
        <Header />
        <div>
          <h3
            data-testid="question-category"
          >
            campo category

          </h3>
          <h4
            data-testid="question-text"
          >
            campo question

          </h4>
          <section
            data-testid="answer-options"
          >
            <button
              type="button"
              data-testid="errado ou certo"
            >
              resposta
            </button>
          </section>
        </div>
      </main>

    );
  }
}

export default Game;
