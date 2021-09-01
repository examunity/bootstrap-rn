export default function isIdent(char) {
  return /[a-z0-9_-]/i.test(char);
}
