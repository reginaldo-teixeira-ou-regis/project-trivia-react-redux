import React, { Component } from 'react';
import Header from '../components/Header';

export default class Game extends Component {
  render() {
    return (
      <main>
        <Header />
        <div>
          <p
            data-testid="question-category"
          >
            campo category

          </p>
          <p
            data-testid="question-text"
          >
            campo question

          </p>
          <section
            data-testid="answer-options"
          >
            <button
              type="button"
              data-testid={}
            />
          </section>
        </div>
      </main>

    );
  }
}
