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

      userEvent.type(inputName, 'Maria');
      userEvent.type(inputEmail, 'maria.santana@outlook.com.br');
      expect(btnPlay).toBeEnabled();
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
test('Checks if when clicking on the button "Play" the page is redirected', () => {
    const { history, store } = renderWithRouterAndRedux(<App />)
    const inputName = screen.getByRole('textbox', {
        name: /name/i
      });
    const inputEmail = screen.getByRole('textbox', {
        name: /email/i
      });
    const btnPlay = screen.getByRole('button', {
        name: /play/i
      });

  expect(history.location.pathname).toBe('/');

  userEvent.type(inputName, 'Trybe');
  userEvent.type(inputEmail, 'test@test.com');

  userEvent.click(btnPlay);
  history.push('/game')

  expect(history.location.pathname).toBe('/game')
  expect(store.getState().player.name).toEqual('');
  expect(store.getState().player.email).toEqual('');
})
});

//falta fazer a cobertura da função hndleSubmit
