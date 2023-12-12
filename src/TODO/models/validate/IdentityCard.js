import { GENDER_MAP } from '@/models/common/Gender';
import { CREDENTIAL_TYPE_MAP } from '@/models/common/credential';

export default {
  type: CREDENTIAL_TYPE_MAP.IDENTITY_CARD.value,

  name: CREDENTIAL_TYPE_MAP.IDENTITY_CARD.name,

  isValid(number, oldIdentityCard) {
    const identity18Reg = /^[1-9]\d{5}((19|20)\d{2})((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    const identity15Reg = /^[1-9]\d{5}\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}$/;
    return number && (identity18Reg.test(number) || (oldIdentityCard && identity15Reg.test(number)));
  },

  getGender(number) {
    if (!this.isValid(number)) {
      return null;
    }
    const digit = number.charCodeAt(16) - 48;
    return (digit % 2 === 1 ? GENDER_MAP.MALE.value : GENDER_MAP.FEMALE.value);
  },

  getBirthday(number) {
    if (!this.isValid(number)) {
      return null;
    }
    const year = number.substring(6, 6 + 4);
    const month = number.substring(10, 10 + 2);
    const day = number.substring(12, 12 + 2);
    return `${year}-${month}-${day}`;
  },
};
