import { DEFAULT_CREDENTIAL_TYPE } from '@/models/common/credential';
import IdentityCard from './validate/identity-card';

class Credential {
  constructor(type = DEFAULT_CREDENTIAL_TYPE.value, number = '') {
    this.type = type;
    this.number = number;
  }

  isIdentityCard() {
    return (this.type === DEFAULT_CREDENTIAL_TYPE.value);
  }

  assign(obj = {}) {
    this.type = obj.type;
    this.number = obj.number;
  }

  static create(obj) {
    const result = new Credential();
    if (Object.prototype.toString.call(obj) === '[object Object]') {
      result.assign(obj);
    }
    return result;
  }

  validate() {
    if (!this.type || !this.number) {
      return false;
    }
    if (this.isIdentityCard(this.type)) {
      return IdentityCard.isValid(this.number, true);
    }
    return !!this.number;
  }
}

export default Credential;
