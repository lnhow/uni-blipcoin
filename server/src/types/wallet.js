const ec = require('../config').ec;
const Transaction = require('./transaction');

class Wallet {
  /**
   * @param {ec.KeyPair} keyPair
   */
  constructor(keyPair) {
    this.keyPair = keyPair;
  }

  /**
   * Get public address of the wallet
   * @returns {string} Wallet's public address
   */
  getAddress() {
    return this.keyPair.getPublic('hex');
  }

  /**
   * Get private key of the wallet
   * @returns {string} Wallet's private key
   */
  getPrivate() {
    return this.keyPair.getPrivate('hex');
  }

  /**
   * Sign a transaction;
   * @param {Transaction} transaction
   */
  signTransaction(transaction) {
    transaction.sign(this.keyPair);
  }

  /**
   * Create a new wallet
   * @returns Newly created wallet
   */
  static createWallet() {
    return new Wallet(Wallet.genKeyPair());
  }

  /**
   * Retrieve a wallet from private key
   * @param {string} privateKey
   * @returns
   */
  static getFromPrivate(privateKey) {
    return new Wallet(ec.keyFromPrivate(privateKey));
  }

  /**
   * Generate a new key pair - wallet
   * @returns Wallet - keyPair
   */
  static genKeyPair = () => {
    const keyPair = ec.genKeyPair();
    return keyPair;
  };
}

module.exports = Wallet;
