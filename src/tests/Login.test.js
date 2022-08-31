import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWthRouterAndRedux from './helpers/renderWith';
import App from '../App';

const testEmail = 'test.test@gmail.com';

describe('Teste a page "Login.js"', () => {
  test('Testa se o url da tela de login é "/"', () => {
    const { history } = renderWthRouterAndRedux(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Testa se exite o campo de email na aplicação', () => {
    renderWthRouterAndRedux(<App />);
    const loginEmail = screen.getByLabelText(/email/i);
    expect(loginEmail).toBeInTheDocument();
  });

  test('Testa se o campo de email esta vazio ao iniciar a aplicação', () => {
    renderWthRouterAndRedux(<App />);
    const loginEmail = screen.getByLabelText(/email/i);
    expect(loginEmail).toBeInTheDocument();
    expect(loginEmail).toHaveValue('');
  });

  test('Testa se exite o campo de senha na aplicação', () => {
    renderWthRouterAndRedux(<App />);
    const loginPassword = screen.getByLabelText(/senha/i);
    expect(loginPassword).toBeInTheDocument();
  });

  test('Testa se o campo de senha esta vazio ao iniciar a aplicação', () => {
    renderWthRouterAndRedux(<App />);
    const loginPassword = screen.getByLabelText(/senha/i);
    expect(loginPassword).toBeInTheDocument();
    expect(loginPassword).toHaveValue('');
  });

  test('Testa se exite um botão com o texto "Entrar"', () => {
    renderWthRouterAndRedux(<App />);
    const loginButton = screen.getByRole('button', { name: /entrar/i });
    expect(loginButton).toBeInTheDocument();
  });

  test('Testa se ao iniciar a aplicação, o botão "Entrar" está desabilitado', () => {
    renderWthRouterAndRedux(<App />);
    const loginButton = screen.getByRole('button', { name: /entrar/i });
    expect(loginButton).toBeDisabled();
  });

  test('Testa se o botão "Entrar" habilita ao digitar email e senha', async () => {
    renderWthRouterAndRedux(<App />);
    const loginButton = screen.getByRole('button', { name: /entrar/i });
    const loginEmail = screen.getByLabelText(/email/i);
    const loginPassword = screen.getByLabelText(/senha/i);

    expect(loginButton).toBeDisabled();

    userEvent.type(loginEmail, testEmail);
    expect(loginButton).toBeDisabled();

    userEvent.type(loginPassword, '123456');
    expect(loginPassword).not.toBeDisabled();
  });

  test('Testa se ao clicar no botão "Entrar", a rota muda para "/carteira"', () => {
    const { history, store } = renderWthRouterAndRedux(<App />);

    const loginButton = screen.getByRole('button', { name: /entrar/i });
    const loginEmail = screen.getByLabelText(/email/i);
    const loginPassword = screen.getByLabelText(/senha/i);

    expect(loginButton).toBeDisabled();

    userEvent.type(loginEmail, testEmail);
    expect(loginButton).toBeDisabled();

    userEvent.type(loginPassword, '123456');
    expect(loginPassword).not.toBeDisabled();

    userEvent.click(loginButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');

    const { user } = store.getState();
    expect(user.email).toBe(testEmail);
  });
});
