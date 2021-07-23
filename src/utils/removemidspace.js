/**
 * 待去除的空格字符的正则表达式。
 *
 * 目前只包含ASCII空格，以及**全角中文空格**。
 */

/* eslint-disable */
const SPACE_REGEXP = /[ 　]/g;
/* eslint-enable */

export default function removeSpace(str) {
  return str ? str.replace(SPACE_REGEXP, '') : '';
}
