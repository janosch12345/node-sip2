'use strict';

const RequestMessage = require('../RequestMessage');

class RenewRequest extends RequestMessage {
  constructor(itemIdentifier,nbDueDate, itemProperties,feeAcknowledged) {
    super('29');
    
    this.thirdParty = false;
    this.noBlock = false;//false
    this.nbDueDate =  nbDueDate || RequestMessage.getDateTime();
    this.itemIdentifier = itemIdentifier;
    this.itemProperties = itemProperties || '';
    this.feeAcknowledged = feeAcknowledged || null;
    this.transactionDate = RequestMessage.getDateTime();
    
  }

  buildMessage() {
    this.append(this.thirdParty ? 'Y' : 'N');
    this.append(this.noBlock ? 'Y' : 'N');
    this.append(this.transactionDate);
    this.append(this.nbDueDate);
    this.append('AO');
    this.append(this.institutionId);
    this.append('|AA');
    this.append(this.patronIdentifier);
    this.append('|AB');
    this.append(this.itemIdentifier);
    this.append('|AC');
    this.append(this.terminalPassword);
    if (this.itemProperties) {
      this.append('|CH');
      this.append(this.itemProperties);
    }
    if (this.feeAcknowledged !== null) {
      this.append('|BO');
      this.append(this.feeAcknowledged ? 'Y' : 'N');
    }
    
  }
}

module.exports = RenewRequest;