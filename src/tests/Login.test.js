import React from "react";
import { screen, waitFor, fireEvent } from "@testing-library/react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import userEvent from "@testing-library/user-event";
import App from "../App";
import Game from "../pages/Game";
import { act } from "react-dom/test-utils";

describe("Testing the page of Login", () => {
  it("Testing if the page Login render normally", () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByPlaceholderText("Type your name");
    const inputEmail = screen.getByPlaceholderText("Type your email");
    const btnPlay = screen.getByRole("button", { name: /play/i });

    expect(inputEmail).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(btnPlay).toBeInTheDocument();

    expect(inputName.value).toBe("");
    expect(inputName.id).toBe("name");
    expect(inputEmail.value).toBe("");
    expect(btnPlay.disabled).toBe(true);

    userEvent.type(inputName, "Trybe");

    expect(inputName.value).toBe("Trybe");
    expect(btnPlay.disabled).toBe(true);

    userEvent.type(inputEmail, "test@test.com");

    expect(inputEmail.value).toBe("test@test.com");
    expect(btnPlay.disabled).toBe(false);
  });

  it('Checks that the "Play" button redirects to the game screen and that the quizzes are rendered correc', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputName = screen.getByPlaceholderText("Type your name");
    const inputEmail = screen.getByPlaceholderText("Type your email");
    const btnPlay = screen.getByRole("button", { name: /play/i });

    expect(history.location.pathname).toBe("/");

    userEvent.type(inputName, "Trybe");
    userEvent.type(inputEmail, "test@test.com");
    userEvent.click(btnPlay);

    const headerScore = await screen.findByTestId("header-score");
    const questionCategory = await screen.findByTestId("question-category");
    const questionText = await screen.findByTestId("question-text");
    const answerOptions = await screen.findByTestId("answer-options");

    expect(headerScore).toBeInTheDocument();
    expect(questionCategory).toBeInTheDocument();
    expect(questionText).toBeInTheDocument();
    expect(answerOptions).toBeInTheDocument();

    expect(history.location.pathname).toBe("/game");

    const gameTimer = await screen.findByTestId("game-timer");
    expect(gameTimer).toHaveTextContent("30");
    await waitFor(
      () => {
        expect(gameTimer).toHaveTextContent("29");
      },
      { timeout: 10000 }
    );

    const correctAnswer01 = await screen.findByTestId("correct-answer");
    userEvent.click(correctAnswer01);
    const btnNext1 = await screen.findByTestId("btn-next");
    userEvent.click(btnNext1);

    const correctAnswer02 = await screen.findByTestId("correct-answer");
    userEvent.click(correctAnswer02);
    const btnNext2 = await screen.findByTestId("btn-next");
    userEvent.click(btnNext2);

    const correctAnswer03 = await screen.findByTestId("correct-answer");
    userEvent.click(correctAnswer03);
    const btnNext3 = await screen.findByTestId("btn-next");
    userEvent.click(btnNext3);

    const correctAnswer04 = await screen.findByTestId("correct-answer");
    userEvent.click(correctAnswer04);
    const btnNext4 = await screen.findByTestId("btn-next");
    userEvent.click(btnNext4);

    const correctAnswer05 = await screen.findByTestId("correct-answer");
    userEvent.click(correctAnswer05);
    const btnNext5 = await screen.findByTestId("btn-next");
    userEvent.click(btnNext5);

    expect(history.location.pathname).toBe("/feedback");
    const feedbackText = await screen.findByTestId("feedback-text");
    expect(feedbackText).toBeInTheDocument();
  });

  it("Check if there is a button that when clicked goes to the settings page", async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const btnSettings = screen.getByTestId("btn-settings");

    userEvent.click(btnSettings);

    expect(history.location.pathname).toBe("/settings");

    const settingsTitle = await screen.findByTestId("settings-title");
    expect(settingsTitle).toBeInTheDocument();
  });

  it("", async () => {
    const { history } = renderWithRouterAndRedux(<Game />);

    const gameTimer = await screen.findByTestId("game-timer");
    expect(gameTimer).toHaveTextContent("30");
    await waitFor(
      () => {
        expect(gameTimer).toHaveTextContent("0");
      },
      { timeout: 10000 }
    );
    setTimeout(async () => {
      const correctAnswer = await screen.findByTestId("correct-answer");
      expect(correctAnswer.disabled).toBe(true);
    }, 500);
  });

  /* it("reseta o timer para 30 quando ele chega a 0", async () => {
    renderWithRouterAndRedux(<Game />);

    const timerDisplay = await screen.findByTestId("game-timer");

    act(() => {
      fireEvent.click(getByTestId("btn-next"));
    });
    act(() => {
      jest.advanceTimersByTime(31000);
    });

    expect(timerDisplay).toHaveTextContent("30");
  }); */

  
});

// 95.65 | 80 | 100 | 96.71
