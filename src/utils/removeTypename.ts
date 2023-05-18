export const removeTypename = (object: Object | null) => {
  if (!object) return;
  return Object.keys(object)
    .filter((key) => key !== '__typename')
    .reduce((obj: any, key: string) => {
      let newobj;
      if (typeof object[key as keyof typeof object] === 'object') {
        newobj = removeTypename(object[key as keyof typeof object]);
      } else {
        newobj = object[key as keyof typeof object];
      }
      obj[key] = newobj;
      return obj;
    }, {});
};
