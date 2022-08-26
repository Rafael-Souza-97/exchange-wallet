import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  state = {
    spendingList: 0,
  };

  render() {
    const { spendingList } = this.state;
    const { email } = this.props;

    return (
      <div>
        <p>TrybeWallet</p>

        <p data-testid="email-field">{ email }</p>

        <div className="spending-list">
          <p data-testid="total-field">
            {`Despesa Total = R$ ${spendingList}`}
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
  };
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
