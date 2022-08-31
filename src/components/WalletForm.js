import React, { Component } from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrency, addExpenseAction } from '../redux/actions/index';
import ExpenseEdit from './ExpenseEdit';

const API_URL = 'https://economia.awesomeapi.com.br/json/all';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    tag: 'Alimentacao',
    currency: 'USD',
    method: 'Dinheiro',
    exchangeRates: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrency());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  onClickChange = async () => {
    const { dispatch } = this.props;
    const response = await fetch(API_URL);
    const json = await response.json();
    delete json.USDT;
    this.setState({
      exchangeRates: json,
    }, () => {
      dispatch(addExpenseAction(this.state));
      this.setState({
        value: '',
        description: '',
        tag: 'Alimentacao',
        currency: 'USD',
        method: 'Dinheiro',
        exchangeRates: {},
      });
    });
  };

  render() {
    const { currencies, edit } = this.props;
    const { value,
      description,
      tag,
      currency,
      method,
    } = this.state;

    return (
      !edit ? (
        <form>
          <label htmlFor="value">
            Valor da despesa:
            <input
              type="number"
              id="value"
              name="value"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="expenseDescriptionTag">
            Descrição da despesa:
            <input
              type="text"
              id="expenseDescriptionTag"
              name="description"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="methodSelect">
            Categoria:
            <select
              id="methodSelect"
              name="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option defaultValue value="Alimentacao">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <label htmlFor="currencySelect">
            Moeda:
            <select
              id="currencySelect"
              name="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChange }
            >
              { currencies.map((currencyMap, index) => (
                <option key={ index } value={ currencyMap }>{ currencyMap }</option>
              ))}
            </select>
          </label>

          <label htmlFor="methodSelect">
            Método de Pagamento:
            <select
              id="methodSelect"
              name="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              <option defaultValue value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <button
            type="button"
            onClick={ this.onClickChange }
          >
            Adicionar despesa
          </button>
        </form>
      ) : <ExpenseEdit />
    );
  }
}

function mapStateToProps(state) {
  return {
    currencies: state.wallet.currencies,
    edit: state.wallet.editor,
  };
}

WalletForm.propTypes = {
  currencies: string,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
