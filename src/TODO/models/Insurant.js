import { Person, Credential } from '@njzhyl/common-model';
import IdentityCard from './validate/identity-card.js';

class Insurant extends Person {
  assign(obj = {}) {
    this.name = obj.name;
    this.birthday = obj.birthday;
    this.credential = Credential.create(obj.credential);
    this.gender = obj.gender;
    this.kinship = obj.kinship;
    this.mobile = obj.mobile;
  }

  static create(obj) {
    const result = new Insurant();
    if (Object.prototype.toString.call(obj) === '[object Object]') {
      result.assign(obj);
      if (result.hasCredential()) {
        result.refreshGenderBirthday();
      }
    }
    return result;
  }

  static createArray(insurants) {
    return insurants.map((insurant) => Insurant.create(insurant));
  }

  isIdentityCard() {
    return this.credential.type === IdentityCard.type && IdentityCard.isValid(this.credential.number);
  }

  setCredential(credential, changes) {
    if (!credential) {
      this.credential = null;
      if (changes) {
        changes.credential = null;
      }
    } else {
      this.credential = Credential.create(credential);
      if (changes) {
        changes.credential = Credential.create(credential);
      }
      if (IdentityCard.isValid(this.credential.number)) {
        this.gender = IdentityCard.getGender(this.credential.number);
        this.birthday = IdentityCard.getBirthday(this.credential.number);
        if (changes) {
          changes.gender = this.gender;
          changes.birthday = this.birthday;
        }
      }
    }
  }

  refreshGenderBirthday() {
    if (IdentityCard.isValid(this.credential.number)) {
      this.gender = IdentityCard.getGender(this.credential.number);
      this.birthday = IdentityCard.getBirthday(this.credential.number);
    }
  }
}

export default Insurant;
