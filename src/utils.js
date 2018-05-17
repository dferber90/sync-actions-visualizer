export const format = data => JSON.stringify(data, null, 2);

export const parseAndFormat = str => {
  try {
    const parsed = parse(str);
    return format(parsed);
  } catch (e) {
    return str;
  }
};

// Use "eval" instead of JSON.parse so that we don't need the quotes
// Using "eval" is okay here, as this site is static and there is
// nothing to hack.
// eval('({ foo: true })') returns { foo: true }
// eslint-disable-next-line no-eval
export const parse = str => eval('(' + str + ')');
