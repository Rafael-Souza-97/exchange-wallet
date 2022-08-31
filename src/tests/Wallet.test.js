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

  test('Testa se exite o campo de valor total da despesa', () => {
    renderWthRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const expenseTotalTitle = screen.getByText(/despesa total/i);
    expect(expenseTotalTitle).toBeInTheDocument();
    const expenseTotalValue = screen.getByTestId('total-field');
    expect(expenseTotalValue).toBeInTheDocument();
  });
});
