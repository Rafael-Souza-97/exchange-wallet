import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <header className="wallet-header">
          <Header />
        </header>

        <main>
          <WalletForm />
          <section>
            <Table />
          </section>
        </main>

      </>
    );
  }
}

export default Wallet;
