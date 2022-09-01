import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockData from './helpers/mockData';
import App from '../App';

const INITIAL_STATE = {
  user: {
    email: 'test.test@gmail.com',
  },
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
    expenses: [
      {
        id: 0,
        value: '10',
        currency: 'BTC',
        method: 'Cartão de débito',
        description: 'Ten Bitcoins',
        tag: 'Lazer',
        exchangeRates: mockData,
      },
      {
        id: 1,
        value: '20',
        currency: 'USD',
        method: 'Dinheiro',
        description: 'Twenty Dolars',
        tag: 'Trabalho',
        exchangeRates: mockData,
      },
      {
        id: 2,
        value: '30',
        currency: 'EUR',
        method: 'Cartão de crédito',
        description: 'Thirty Euros',
        tag: 'Saúde',
        exchangeRates: mockData,
      },
    ],
  },
};

describe('Teste a page "Wallet.js"', () => {
  test('Testa se o url da tela "wallet" é "/carteira"', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const { pathname } = history.location;

    expect(pathname).toBe('/carteira');
  });

  test('Testa se o header da Table exite ao iniciar a aplicação na url /carteira', () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      { initialState: INITIAL_STATE },
    );

    history.push('/carteira');
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');

    const { email } = INITIAL_STATE.user;

    const headerTitle = screen.getByRole('heading', { level: 3, name: /trybeWallet/i });
    expect(headerTitle).toBeInTheDocument();

    const userEmail = screen.getByText(email);
    expect(userEmail).toBeInTheDocument();

    const defaultCurrency = screen.getByText('BRL');
    expect(defaultCurrency).toBeInTheDocument();
  });

  test('Testa se exite o campo input de "Valor da despesa:" na aplicação na url /carteira', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const expenseValue = screen.getByLabelText(/valor da despesa/i);
    expect(expenseValue).toBeInTheDocument();
    expect(expenseValue).toHaveProperty('value', '');
  });

  test('Testa se exite o campo input de "Descrição da despesa:" na aplicação na url /carteira', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const expenseDescription = screen.getByLabelText(/descrição da despesa/i);
    expect(expenseDescription).toBeInTheDocument();
    expect(expenseDescription).toHaveProperty('value', '');
  });

  test('Testa se exite o campo select "Categoria:" na aplicação na url /carteira', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const categorySelect = screen.getByLabelText(/categoria/i);
    expect(categorySelect).toBeInTheDocument();
    expect(categorySelect).toHaveProperty('value', 'Alimentacao');
  });

  test('Testa se exite o campo select "Moeda:" na aplicação na url /carteira', () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      { initialState: INITIAL_STATE },
    );

    history.push('/carteira');

    const currencySelect = screen.getByLabelText(/moeda/i);
    expect(currencySelect).toBeInTheDocument();
    userEvent.selectOptions(currencySelect, ['BTC']);
    expect(currencySelect).toHaveProperty('value', 'BTC');
  });

  test('Testa se exite o campo select "Método de Pagamento:" na aplicação na url /carteira', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const methodSelector = screen.getByLabelText(/método de pagamento/i);
    expect(methodSelector).toBeInTheDocument();
    expect(methodSelector).toHaveProperty('value', 'Dinheiro');
  });

  test('Testa se exite o botão "Adicionar Despesa" ao iniciar a aplicação na url /carteira', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const addExpenseButton = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(addExpenseButton).toBeInTheDocument();
  });

  test('Testa se a despesa é renderizada ao ser adicionada', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const expenseValue = screen.getByLabelText(/valor da despesa/i);
    expect(expenseValue).toBeInTheDocument();
    userEvent.type(expenseValue, '40');
    expect(expenseValue).toHaveProperty('value', '40');

    const expenseDescription = screen.getByLabelText(/descrição da despesa/i);
    expect(expenseDescription).toBeInTheDocument();
    userEvent.type(expenseDescription, 'test');
    expect(expenseDescription).toHaveProperty('value', 'test');

    const addExpenseButton = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(addExpenseButton).toBeInTheDocument();
    userEvent.click(addExpenseButton);
    expect(global.fetch).toBeCalledTimes(2);

    const { wallet: { editor } } = store.getState();
    expect(typeof (editor)).toEqual('boolean');
    expect(editor).not.toBeTruthy();

    const deleteButton = await screen.findByRole('button', { name: /excluir/i });
    expect(deleteButton).toBeInTheDocument();
    userEvent.click(deleteButton);
    expect(deleteButton).not.toBeInTheDocument();

    userEvent.type(expenseValue, '50');
    expect(expenseValue).toHaveProperty('value', '50');
    userEvent.type(expenseDescription, 'editTest');
    expect(expenseDescription).toHaveProperty('value', 'editTest');
    userEvent.click(addExpenseButton);

    const editButton = await screen.findByRole('button', { name: /editar/i });
    expect(editButton).toBeInTheDocument();
    userEvent.click(editButton);
    expect(addExpenseButton).not.toBeInTheDocument();

    const addEditedExpenseButton = await screen.findByRole('button', { name: /editar despesa/i });
    expect(addEditedExpenseButton).toBeInTheDocument();
    const { wallet } = store.getState();
    expect(wallet.editor).toBeTruthy();
    userEvent.click(addEditedExpenseButton);
  });
});
