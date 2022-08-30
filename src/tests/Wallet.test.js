import { screen } from '@testing-library/react';
import renderWthRouterAndRedux from './helpers/renderWith';
import App from '../App';

describe('Teste a page "Wallet.js"', () => {
  test('Testa se o url da tela "wallet" é "/carteira"', () => {
    const { history } = renderWthRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const { pathname } = history.location;

    expect(pathname).toBe('/carteira');
  });

  test('Testa se exite o campo input de "Valor da despesa:" na aplicação', () => {
    renderWthRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const expenseValue = screen.getByLabelText(/valor da despesa/i);
    expect(expenseValue).toBeInTheDocument();
  });

  test('Testa se exite o campo select "Categoria:" na aplicação', () => {
    renderWthRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const categorySelect = screen.getByLabelText(/categoria/i);
    expect(categorySelect).toBeInTheDocument();
  });

  test('Testa se exite o campo select "Moeda:" na aplicação', () => {
    renderWthRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const currencySelect = screen.getByLabelText(/moeda/i);
    expect(currencySelect).toBeInTheDocument();
  });
});
