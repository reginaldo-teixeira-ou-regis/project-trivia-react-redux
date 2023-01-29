import React from "react";
import { screen } from "@testing-library/react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import userEvent from "@testing-library/user-event";
import { mockData } from "./helpers/mockData";
import App from "../App";
import Ranking from "../pages/Ranking";
import { act } from "react-dom/test-utils";

describe("Testing the page of Ranking", () => {
  it("Checks that players ranking render correctly on screen", () => {
    const { history } = renderWithRouterAndRedux(<App />);

    Object.defineProperty(window, "localStorage", { value: mockData });

    act(() => history.push("/ranking"));

    const playerOne = screen.getByTestId("player-name-0");
    const score_1 = screen.getByTestId("player-score-0");

    expect(playerOne).toBeInTheDocument();
    expect(score_1).toBeInTheDocument();

    expect(screen.getByTestId("player-name-1")).toBeInTheDocument();
    expect(screen.getByTestId("player-name-2")).toBeInTheDocument();
  });

  it("Checks if there is a button that redirects the player to the Login screen", () => {
    const { history } = renderWithRouterAndRedux(<Ranking />);

    const btnGoHome = screen.getByTestId("btn-go-home");

    expect(btnGoHome).toBeInTheDocument();
    userEvent.click(btnGoHome);

    expect(history.location.pathname).toBe("/");
  });
});
