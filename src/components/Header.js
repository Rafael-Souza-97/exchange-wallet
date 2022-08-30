import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenseValue } = this.props;
    const sumHeaderValue = expenseValue.reduce((acc, curr) => acc + Number(curr), 0);

    return (
      <div>
        <p>TrybeWallet</p>

        <p data-testid="email-field">{ email }</p>

        <div className="spending-list">
          <p data-testid="total-field">
            { sumHeaderValue }
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
    expenseValue: state.wallet.addExpenseSum,
  };
}

Header.propTypes = {
  email: string,
}.isRequired;

export default connect(mapStateToProps)(Header);
