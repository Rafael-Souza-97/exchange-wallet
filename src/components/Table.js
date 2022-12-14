import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import { removeExpense, editExpense } from '../redux/actions';

class Table extends Component {
  onClickDelete = ({ target }) => {
    const { id } = target;
    const { dispatch } = this.props;
    dispatch((removeExpense(id)));
  };

  onClickEdit = ({ target }) => {
    const { id } = target;
    const { dispatch } = this.props;
    dispatch((editExpense(id)));
  };

  render() {
    const { expenses } = this.props;

    return (
      <div className="tableDiv">
        <table className="table is-hoverable is-centered">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Método de pagamento</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Categoria</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((expense) => (
              <tr key={ expense.id } className="expenses-list">
                <td>{ expense.description }</td>
                <td>{ Number(expense.value).toFixed(2) }</td>
                <td>
                  {
                    expense.exchangeRates[expense.currency].name
                      .split('/Real Brasileiro')
                  }
                </td>
                <td>{ expense.method }</td>
                <td>
                  {
                    Number(expense.exchangeRates[expense.currency].ask).toFixed(2)
                  }
                </td>
                <td>
                  {
                    ((Number(expense.value)
                    * Number(expense.exchangeRates[expense.currency].ask))
                      .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))
                  }
                </td>
                <td>BRL (Real)</td>
                <td>{ expense.tag }</td>
                <td>
                  <button
                    className="button-editExpense button is-ligth"
                    type="button"
                    data-testid="edit-btn"
                    id={ expense.id }
                    onClick={ this.onClickEdit }
                  >
                    Editar
                  </button>

                  <button
                    className="button-removeExpense button is-ligth"
                    type="button"
                    data-testid="delete-btn"
                    id={ expense.id }
                    onClick={ this.onClickDelete }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    expenses: state.wallet.expenses,
  };
}

Table.propTypes = {
  expenses: string,
}.isRequired;

export default connect(mapStateToProps)(Table);
