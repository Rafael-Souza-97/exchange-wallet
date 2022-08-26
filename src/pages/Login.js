import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userInfosAction } from '../redux/actions/index';

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
      console.log('sucesso');
      this.setState({ isLoginButtonDisabled: false });
    } else {
      console.log('deu ruim');
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
      <div>
        <form>
          <label htmlFor="emailLogin">
            Email:
            <input
              type="text"
              name="loginEmail"
              data-testid="email-input"
              id="emailLogin"
              placeholder="Digite o seu e-mail"
              value={ loginEmail }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="passwordLogin">
            Senha:
            <input
              type="text"
              name="loginPassword"
              data-testid="password-input"
              id="passwordLogin"
              placeholder="Digite sua senha"
              value={ loginPassword }
              onChange={ this.handleChange }
            />
          </label>

          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ isLoginButtonDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
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
