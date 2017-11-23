export const format = data => JSON.stringify(data, null, 2);

export const parseAndFormat = str => {
  try {
    const parsed = JSON.parse(str);
    return format(parsed);
  } catch (e) {
    return str;
  }
};
