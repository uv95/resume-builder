export const removeTypename = (object: Object | null) => {
  if (!object) return;
  return Object.keys(object)
    .filter((key) => key !== '__typename')
    .reduce((obj: any, key: string) => {
      obj[key] = object[key as keyof typeof object];
      return obj;
    }, {});
};
