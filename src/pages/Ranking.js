import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getRanking } from '../service/saveRanking';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const ranking = getRanking();
    this.setState({
      ranking: this.orderRanking(ranking),
    });
  }

  orderRanking = (ranking) => {
    const orderRanking = ranking.sort((a, b) => Number(b.score) - Number(a.score));
    return orderRanking;
  };

  render() {
    const { ranking } = this.state;

    return (
      <div>
        <h1
          data-testid="ranking-title"
        >
          Ranking General
        </h1>
        <ol>
          {ranking.length !== 0 ? ranking.map((player, index) => (
            <li key={ index }>
              <img
                src={ player.img }
                alt=""
              />
              <p
                data-testid={ `player-name-${index}` }
              >
                {player.name}
              </p>
              <p
                data-testid={ `player-score-${index}` }
              >
                <b>{player.score}</b>
                {' '}
                SCORE
              </p>
            </li>
          )) : (
            <div>
              <h3>NO PLAYER</h3>
            </div>) }
        </ol>
        <button
          type="submit"
        >
          <Link
            to="/"
            data-testid="btn-go-home"
          >
            LOGIN SCREEN
          </Link>
        </button>
      </div>
    );
  }
}

export default Ranking;
