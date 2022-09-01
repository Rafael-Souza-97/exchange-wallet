import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenseValue } = this.props;
    const sumHeaderValue = expenseValue.reduce((acc, curr) => {
      const { value, currency, exchangeRates } = curr;
      const currencyValue = exchangeRates[currency].ask;
      return acc + (value * currencyValue);
    }, 0);

    return (
      <div>
        <h3>TrybeWallet</h3>

        <p data-testid="email-field">{ email }</p>

        <div className="spending-list">
          <p data-testid="total-field">
            { sumHeaderValue.toFixed(2) }
          </p>
        </div>

        <div className="exchange-type">
          <p data-testid="header-currency-field">
            BRL
          </p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.user.email,
    expenseValue: state.wallet.expenses,
  };
}

Header.propTypes = {
  email: string,
}.isRequired;

export default connect(mapStateToProps)(Header);
