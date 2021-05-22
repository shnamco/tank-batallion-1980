export const queryStringify = (data: { [name: string]: unknown }): string => {
  if (!data || !Object.keys(data).length) {
    return '';
  }
  const str = Object.keys(data).reduce((acc: string[], p) => {
    return [...acc, `${p}=${data[p]}`];
  }, []);
  const params = str.join('&');

  return `?${params}`;
};
