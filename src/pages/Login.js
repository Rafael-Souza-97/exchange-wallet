import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { HiOutlineMail } from 'react-icons/hi';
import { FiLogIn } from 'react-icons/fi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { userInfosAction } from '../redux/actions/index';
import '../styles/styles.css';

class Login extends React.Component {
  state = {
    loginEmail: '',
    loginPassword: '',
    isLoginButtonDisabled: true,
  };

  loginValidation = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    const minPasswordLength = 6;
    const { loginEmail, loginPassword } = this.state;
    if (emailRegex.test(loginEmail) && loginPassword.length >= minPasswordLength) {
      this.setState({ isLoginButtonDisabled: false });
    } else {
      this.setState({ isLoginButtonDisabled: true });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.loginValidation);
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    const { loginEmail } = this.state;
    dispatch(userInfosAction(loginEmail));
    history.push('/carteira');
  };

  render() {
    const { loginEmail, loginPassword, isLoginButtonDisabled } = this.state;
    return (
      <div className="container-login">
        <section className="signIn">
          <form className="form">
            <h1 className="title-logo">
              Trybe
              <strong>Wallet</strong>
            </h1>
            <h1 className="title-login">Sign in</h1>

            <div className="input-text">
              <label htmlFor="emailLogin" className="control">
                Email
                <input
                  className="input is-hovered"
                  type="text"
                  name="loginEmail"
                  id="emailLogin"
                  placeholder="Digite o seu e-mail"
                  value={ loginEmail }
                  onChange={ this.handleChange }
                />
              </label>
              <HiOutlineMail className="icon-input" size={ 23 } />
            </div>

            <div className="input-text2">
              <label htmlFor="passwordLogin">
                Senha
                <input
                  className="input is-hovered"
                  type="password"
                  name="loginPassword"
                  id="passwordLogin"
                  placeholder="Digite sua senha"
                  value={ loginPassword }
                  onChange={ this.handleChange }
                />
              </label>
              <RiLockPasswordLine className="icon-input" size={ 22 } />
            </div>

            <p className="forgot">Esqueci minha senha</p>

            <button
              className="button is-link is-hovered"
              type="button"
              data-testid="login-submit-button"
              disabled={ isLoginButtonDisabled }
              onClick={ this.handleClick }
            >
              Avançar
            </button>

            <div className="input-checkbox">
              <label htmlFor="checkbox">
                <input type="checkbox" id="checkbox" />
                {' '}
                Manter conectado
                {' '}
              </label>
            </div>
          </form>
        </section>
        <section className="login-image">
          <section>
            <p className="login-subscribe">
              <strong>QUERO ME CADASTRAR</strong>
              <FiLogIn className="icon-subscribe" size={ 22 } />
            </p>
          </section>
          <p className="title">
            Organize suas finanças
            <strong> em tempo real</strong>
          </p>

          <h2 className="sub">
            Todas as suas despesas nacionais/internacionais em um só lugar
          </h2>

          <button type="button" className="button-saibaMais">
            SAIBA MAIS
          </button>

        </section>

      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
