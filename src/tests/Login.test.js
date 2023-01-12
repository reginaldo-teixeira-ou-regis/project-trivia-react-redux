import React from "react";
import Login from "../pages/Login";
import App from "../App";
import { screen } from "@testing-library/react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import userEvent from "@testing-library/user-event";

describe('Test login page', () => {

test('Checks if the inputs and buttons are on the screen', () => {
    renderWithRouterAndRedux(<App />)
    const inputName = screen.getByRole('textbox', {
        name: /name/i
      });
    const inputEmail = screen.getByRole('textbox', {
        name: /email/i
      });
    const btnPlay = screen.getByRole('button', {
        name: /play/i
      });
    const btnSettings = screen.getByRole('button', {
        name: /configurações/i
      });

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(btnPlay).toBeInTheDocument();
    expect(btnSettings).toBeInTheDocument();
})
test('Checks if the Play button is disabled when starting the page', () => {
    renderWithRouterAndRedux(<App />)
    const btnPlay = screen.getByRole('button', {
        name: /play/i
      });
    expect(btnPlay).toBeDisabled();
})
test('Checks if the button is enabled when filling the iputs', () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(mockData),
  }));
  const url = 'https://opentdb.com/api_token.php?command=request';
  renderWithRouterAndRedux(<App />);

    const inputName = screen.getByRole('textbox', {
        name: /name/i
      });
    const inputEmail = screen.getByRole('textbox', {
        name: /email/i
      });
    const btnPlay = screen.getByRole('button', {
        name: /play/i
      });

      userEvent.type(inputName, 'Maria');
      userEvent.type(inputEmail, 'maria.santana@outlook.com.br');
      expect(btnPlay).toBeEnabled();
      userEvent.click(btnPlay)

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(url);
      
    });

test('Checks if when clicking on the button "Configurações" the page is redirected', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const btnSettings = screen.getByRole('button', {
        name: /configurações/i
      });
    expect(btnSettings).toBeInTheDocument();
    userEvent.click(btnSettings);
    expect(history.location.pathname).toBe('/settings');
})
});
