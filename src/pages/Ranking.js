import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import { resetScore } from '../redux/actions';
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

  getImg = (email) => {
    const hash = md5(email).toString();
    return `https://www.gravatar.com/avatar/${hash}`;
  };

  orderRanking = (ranking) => {
    const orderRanking = ranking.sort((a, b) => Number(b.score) - Number(a.score));
    return orderRanking;
  };

  render() {
    const { ranking } = this.state;
    const { dispatch } = this.props;

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
                src={ this.getImg(player.email) }
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
          onClick={ () => { dispatch(resetScore()); } }
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

Ranking.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Ranking);
