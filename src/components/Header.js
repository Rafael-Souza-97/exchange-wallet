import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import { HiOutlineMail } from 'react-icons/hi';
import { CgShoppingBag } from 'react-icons/cg';
import '../styles/styles.css';

class Header extends Component {
  render() {
    const { email, expenseValue } = this.props;
    const sumHeaderValue = expenseValue.reduce((acc, curr) => {
      const { value, currency, exchangeRates } = curr;
      const currencyValue = exchangeRates[currency].ask;
      return acc + (value * currencyValue);
    }, 0);

    return (
      <div className="headerWallet">
        <div className="title-containerWallet">
          <h1 className="title-logoWallet">
            Trybe
            <strong>Wallet</strong>
          </h1>
        </div>

        <section className="total-value">
          <div className="spending-list">
            <p data-testid="total-field" className="total-field">
              {
                sumHeaderValue
                  .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
              }
              {' '}
            </p>
            <CgShoppingBag className="icon-cart" size={ 24 } />
          </div>

          <div className="exchange-type">
            <p data-testid="header-currency-field">
              BRL
            </p>
          </div>
        </section>

        <section className="email">
          <HiOutlineMail className="icon-email" size={ 24 } />
          <p data-testid="email-field">
            { email }
          </p>
        </section>
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
