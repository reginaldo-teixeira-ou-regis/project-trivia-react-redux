import React from "react";
import { screen } from "@testing-library/react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import userEvent from "@testing-library/user-event";
import Feedback from "../pages/Feedback";

describe("Testing the page of Feedback", () => {
  it('Checks if when clicking on the "Play Again" button the person is redirected to the Login screen', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);

    const btnPlayAgain = screen.getByTestId("btn-play-again");
    const btnRanking = screen.getByTestId("btn-ranking");

    expect(btnPlayAgain).toBeInTheDocument();
    expect(btnRanking).toBeInTheDocument();

    userEvent.click(btnPlayAgain);

    expect(history.location.pathname).toBe("/");
  });

  it('Checks if when clicking on the "Ranking" button the person is redirected to the ranking screen', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);

    const btnRanking = screen.getByTestId("btn-ranking");

    userEvent.click(btnRanking);
    expect(history.location.pathname).toBe("/ranking");
  });

  it("Testing when the player gets less than 3 questions right", () => {
    const INITIAL_STATE = {
      player: {
        name: "Julia Viana",
        gravatarEmail: "julia_viana@email.com",
        score: 39,
        assertions: 1,
      },
    };

    renderWithRouterAndRedux(<Feedback />, INITIAL_STATE);

    const playedBadly = screen.getByRole("heading", {
      name: /could be better\.\.\./i,
    });
    const score = screen.getAllByText(/39/i);
    const assertions = screen.getByText(/1/i);

    expect(playedBadly).toBeInTheDocument();
    expect(score.length).toBe(2);
    expect(assertions).toBeInTheDocument();
  });

  it("Testing when the player gets more than 3 questions right", () => {
    const INITIAL_STATE = {
      player: {
        name: "Reginaldo Teixeira",
        gravatarEmail: "reginaldo_teixeira@email.com",
        score: 292,
        assertions: 4,
      },
    };

    renderWithRouterAndRedux(<Feedback />, INITIAL_STATE);

    const playedWell = screen.getByRole("heading", { name: /well done!/i });
    const score = screen.getAllByText(/292/i);
    const assertions = screen.getByText(/4/i);

    expect(playedWell).toBeInTheDocument();
    expect(score.length).toBe(2);
    expect(assertions).toBeInTheDocument();
  });
});
