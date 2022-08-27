import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrency } from '../redux/actions/index';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrency());
  }

  render() {
    const { currencies } = this.props;
    console.log(currencies);

    return (
      <form>
        <label htmlFor="expenseValue">
          Valor da despesa:
          <input
            type="number"
            id="expenseValue"
            data-testid="value-input"
          />
        </label>

        <label htmlFor="expenseDescription">
          Descrição da despesa:
          <input
            type="text"
            id="expenseDescription"
            data-testid="description-input"
          />
        </label>

        <label htmlFor="methodSelect">
          Categoria:
          <select id="methodSelect" data-testid="tag-input">
            <option defaultValue value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>

        <label htmlFor="currencySelect">
          Moeda:
          <select id="currencySelect" data-testid="currency-input">
            { currencies.map((currency, index) => (
              <option key={ index } value={ currency }>{ currency }</option>
            ))}
          </select>
        </label>

        <label htmlFor="methodSelect">
          Método de Pagamento:
          <select id="methodSelect" data-testid="method-input">
            <option defaultValue value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    currencies: state.wallet.currencies,
  };
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
