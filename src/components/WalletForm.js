import React, { Component } from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import { MdAttachMoney, MdOutlineDescription } from 'react-icons/md';
import { TbZoomMoney } from 'react-icons/tb';
import { BiCategoryAlt } from 'react-icons/bi';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { fetchCurrency, addExpenseAction } from '../redux/actions/index';
import ExpenseEdit from './ExpenseEdit';
import '../styles/styles.css';

const API_URL = 'https://economia.awesomeapi.com.br/json/all';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    tag: 'Alimentação',
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
        <form className="wallet-form">
          <section className="input-expense">
            <label htmlFor="expenseDescriptionTag">
              Descrição da despesa:
              <input
                className="input-wallet"
                type="text"
                id="expenseDescriptionTag"
                name="description"
                data-testid="description-input"
                value={ description }
                onChange={ this.handleChange }
              />
              <MdOutlineDescription className="icon-inputDescription" size={ 20 } />
            </label>
          </section>

          <section className="input-expense numberInput">
            <label htmlFor="value">
              Valor da despesa:
              <input
                className="input-wallet "
                type="number"
                id="value"
                name="value"
                data-testid="value-input"
                value={ value }
                onChange={ this.handleChange }
              />
              <MdAttachMoney className="icon-inputValue" size={ 20 } />
            </label>
          </section>

          <section className="input-expense">
            <label htmlFor="currencySelect">
              Moeda:
              <select
                className="input-wallet"
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
              <TbZoomMoney className="icon-inputMoney" size={ 20 } />
            </label>
          </section>

          <section className="input-expense">
            <label htmlFor="methodSelector">
              Método de Pagamento:
              <select
                className="input-wallet"
                id="methodSelector"
                name="method"
                data-testid="method-input"
                value={ method }
                onChange={ this.handleChange }
              >
                <option defaultValue value="Dinheiro">Dinheiro</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Cartão de débito">Cartão de débito</option>
                <option value="Pix">Pix</option>
              </select>
              <RiSecurePaymentLine className="icon-inputPayment" size={ 20 } />
            </label>
          </section>

          <section className="input-expense">
            <label htmlFor="methodSelect">
              Categoria:
              <select
                className="input-wallet"
                id="methodSelect"
                name="tag"
                data-testid="tag-input"
                value={ tag }
                onChange={ this.handleChange }
              >
                <option defaultValue value="Alimentação">Alimentação</option>
                <option value="Lazer">Lazer</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Transporte">Transporte</option>
                <option value="Saúde">Saúde</option>
              </select>
              <BiCategoryAlt className="icon-inputTag" size={ 20 } />
            </label>
          </section>

          <button
            className="button-addExpense button is-ligth"
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
