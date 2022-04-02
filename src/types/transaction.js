const crypto = require('crypto');
const system = require('../config').system;
const ec = require('../config').ec;

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
    this.signature = '';
  }

  calculateHashFromData() {
    const data = JSON.stringify({
      fromAddress: this.fromAddress,
      toAddress: this.toAddress,
      amount: this.amount,
    });
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  sign(signKey) {
    if (signKey.getPublic('hex') !== this.fromAddress) {
      // Unathorized to sign transaction
      return false;
    }

    const hash = this.calculateHashFromData();
    const signature = signKey.sign(hash, 'base64');
    this.signature = signature.toDER('hex');
    return true;
  }

  isValid() {
    if (system.address === this.fromAddress) {
      // MINING REWARD
      return true;
    }

    if (!this.signature || this.signature.length === 0) {
      // NO SIGNATURE
      return false;
    }

    const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
    const hash = this.calculateHashFromData();
    return publicKey.verify(hash, this.signature);
  }
}

module.exports = Transaction;
