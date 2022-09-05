import React, { Component } from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import { MdAttachMoney, MdOutlineDescription } from 'react-icons/md';
import { TbZoomMoney } from 'react-icons/tb';
import { BiCategoryAlt } from 'react-icons/bi';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { editSubmitExpense } from '../redux/actions/index';

class ExpenseEdit extends Component {
  state = {
    value: '',
    description: '',
    tag: 'Alimentacao',
    currency: 'USD',
    method: 'Dinheiro',
    exchangeRates: {},
  };

  async componentDidMount() {
    const API_URL = 'https://economia.awesomeapi.com.br/json/all';

    const response = await fetch(API_URL);
    const json = await response.json();
    delete json.USDT;

    const { objectEdit } = this.props;
    this.setState({
      value: objectEdit.value,
      description: objectEdit.description,
      tag: objectEdit.tag,
      currency: objectEdit.currency,
      method: objectEdit.method,
      exchangeRates: json,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  onClickChange = () => {
    const { dispatch } = this.props;
    dispatch(editSubmitExpense(this.state));
  };

  render() {
    const { currencies } = this.props;
    const { value,
      description,
      tag,
      currency,
      method,
    } = this.state;

    return (
      <form className="wallet-form">
        <section className="input-expense">
          <label htmlFor="value">
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
          </label>
          <MdAttachMoney className="icon-inputValue" size={ 20 } />
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
          className="button-addEditExpense button is-ligth"
          type="button"
          onClick={ this.onClickChange }
        >
          Editar despesa
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    currencies: state.wallet.currencies,
    objectEdit: state.wallet.objectEdit[0],
  };
}

ExpenseEdit.propTypes = {
  edit: string,
}.isRequired;

export default connect(mapStateToProps)(ExpenseEdit);
