export default function isIdent(char: string) {
  return /[a-z0-9_-]/i.test(char);
}
