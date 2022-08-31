import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import { removeExpense } from '../redux/actions';

class Table extends Component {
  onClickDelete = ({ target }) => {
    const { id } = target;
    const { dispatch } = this.props;
    dispatch((removeExpense(id)));
  };

  render() {
    const { expenses } = this.props;

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ Number(expense.value).toFixed(2) }</td>
                <td>{ expense.exchangeRates[expense.currency].name }</td>
                <td>{ Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
                <td>
                  {
                    ((Number(expense.value)
                    * Number(expense.exchangeRates[expense.currency].ask)).toFixed(2))
                  }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    id={ expense.id }
                    onClick={ this.onClickDelete }
                  >
                    Excluir
                  </button>

                  <button
                    type="button"
                    data-testid="edit-btn"
                  >
                    Editar
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
