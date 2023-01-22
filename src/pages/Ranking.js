import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import { AiFillStar } from 'react-icons/ai';
import { resetScore } from '../redux/actions';
import { getRanking } from '../service/saveRanking';
import '../style/Ranking.css';

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
      <div className="ranking-general">
        <h1
          className="title-h1"
          data-testid="ranking-title"
        >
          RANKING GENERAL
        </h1>
        <ol>
          {ranking.length !== 0 ? ranking.map((player, index) => (
            <li
              key={ index }
              className="li"
            >
              {' '}
              <img
                className="img-player"
                src={ this.getImg(player.email) }
                alt=""
              />
              <p
                data-testid={ `player-name-${index}` }
                className="name"
              >
                {player.name}
              </p>
              {' '}
              <p
                data-testid={ `player-score-${index}` }
                className="score"
              >
                <AiFillStar className="star" />
                <b className="score-number">{player.score}</b>
                SCORE
              </p>
            </li>
          )) : (
            <div>
              <h3 className="h3">NO PLAYER</h3>
            </div>) }
        </ol>
        <button
          className="play-again"
          type="submit"
          onClick={ () => { dispatch(resetScore()); } }
        >
          <Link
            to="/"
            data-testid="btn-go-home"
          >
            PLAY AGAIN
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
